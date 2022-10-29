from flask_restful import Resource
from models.education_model import EducationModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from helpers import convert_string_to_date
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields
from marshmallow.validate import Range


class UpdateEducationSchema(Schema):
    school_id = fields.Int(required=True, validate=[Range(
        min=1, error="Value must be greater than 0")])
    school_name = fields.Str(required=True)
    degree = fields.Str(required=True)
    major = fields.Str(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    description = fields.Str(required=True)


class UpdateEducation(Resource):
    @classmethod
    @jwt_required()
    def put(cls):
        if get_jwt_identity().get('role') != 'candidate':
            abort(403, message='You are not authorized to access this resource.')

        data = request.get_json()
        # Check for invalid data
        errors = UpdateEducationSchema().validate(data)
        if errors:
            abort(400, message=errors)

        data['start_date'] = convert_string_to_date(data['start_date'])
        data['end_date'] = convert_string_to_date(data['end_date'])

        # Check if the end date is in the past
        if data['end_date'] < data['start_date']:
            abort(400, message='Start date cannot be greater than end date')

        # Save the education model to the database
        try:
            new_education = EducationModel.update(**data)
            if not new_education:
                abort(400, message='Education not found')

        except SQLAlchemyError as e:
            print(e)
            abort(500, message='An error occurred while updating the education')

        return {'education': new_education.to_dict()}, 200
