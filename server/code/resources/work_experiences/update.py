from flask_restful import Resource
from models.work_experience_model import WorkExperienceModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from helpers import convert_string_to_date
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields
from marshmallow.validate import Range
from helpers import dict_to_camel_case


class UpdateWorkExperienceSchema(Schema):
    id = fields.Int(required=True, validate=[Range(
        min=1, error="Value must be greater than 0")])
    company_name = fields.Str(required=True)
    position = fields.Str(required=True)
    current_job = fields.Bool(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    description = fields.Str(required=True)


class UpdateWorkExperience(Resource):
    @classmethod
    @jwt_required()
    def put(cls):
        if get_jwt_identity().get('role') != 'candidate':
            abort(403, message='You are not authorized to access this resource.')

        data = request.get_json()
        # Check for invalid data
        errors = UpdateWorkExperienceSchema().validate(data)
        if errors:
            abort(400, message=errors)

        data['start_date'] = convert_string_to_date(data['start_date'])
        data['end_date'] = convert_string_to_date(data['end_date'])

        # Check if the end date is in the past
        if data['end_date'] < data['start_date']:
            abort(400, message='Start date cannot be greater than end date')

        # Save the work experience model to the database
        try:
            new_work_experience = WorkExperienceModel.update(**data)
            if not new_work_experience:
                abort(400, message='Work experience id not found')

        except SQLAlchemyError as e:
            print(e)
            abort(500, message='An error occurred while updating the work experience')

        return {'work experience': dict_to_camel_case(new_work_experience.to_dict())}, 200
