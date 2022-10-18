from flask_restful import Resource
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from helpers import convert_string_to_date
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields

# Schema to validate the json body of the request.


class AddJobSchema(Schema):
    title = fields.Str(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    location = fields.Str(required=True)
    type = fields.Str(required=True)
    category = fields.Str(required=True)
    experience_level = fields.Str(required=True)
    salary_min = fields.Int(required=True)
    salary_max = fields.Int(required=True)
    description = fields.Str(required=True)


class Add(Resource):

    @classmethod
    @jwt_required()
    def post(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {"message": "Unauthorized"}, 401
        # Check for invalid data
        errors = AddJobSchema().validate(request.get_json())
        if errors:
            abort(400, message=errors)

        data = request.get_json()

        if data['salary_min'] > data['salary_max']:
            return {"message": "salary_min cannot be greater than salary_max"}, 400

        data['start_date'] = convert_string_to_date(data['start_date'])
        data['end_date'] = convert_string_to_date(data['end_date'])

        if data['start_date'] > data['end_date']:
            return {"message": "start_date cannot be greater than end_date"}, 400

        user_id = get_jwt_identity().get('user_id')

        new_job = JobModel(**data, user_id=user_id)

        try:
            new_job.save_to_db()
        except SQLAlchemyError as e:
            print(e)
            return {"message": "An error occurred while creating the job."}, 500

        return {"message": "Job created successfully."}, 201
