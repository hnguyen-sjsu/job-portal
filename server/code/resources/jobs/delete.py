from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields

# Schema to validate the json body of the request.


class DeleteSchema(Schema):
    job_id = fields.Int(required=True)


class DeleteJob(Resource):

    @classmethod
    @jwt_required()
    def delete(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            abort(401, message='Unauthorized')

        errors = DeleteSchema().validate(request.get_json())
        if errors:
            abort(400, message=errors)

        data = request.get_json()

        job = JobModel.find_by_job_id(data['job_id'])

        if not job:
            abort(404, message='Job not found')
        try:
            job.delete_from_db()
        except SQLAlchemyError as e:
            print(e)
            abort(500, message='An error occurred while deleting the job.')

        return {'message': 'Job deleted successfully'}, 200
