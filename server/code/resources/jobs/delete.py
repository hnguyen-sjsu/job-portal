from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields

# Schema to validate the json body of the request.


class DeleteSchema(Schema):
    job_id = fields.Int(required=True, validate=lambda x: x > 0)


class DeleteJob(Resource):

    @classmethod
    @jwt_required()
    def delete(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            abort(401, message='You are not authorized to access this route')

        errors = DeleteSchema().validate(request.args)
        if errors:
            abort(400, message=errors)

        # get the job_id from the url
        job_id = request.args.get('job_id')

        job = JobModel.find_by_job_id(job_id)

        if not job:
            abort(404, message='Job not found')

        try:
            JobModel.delete_from_db(_id=job_id)
        except SQLAlchemyError as e:
            print(e)
            abort(500, message='An error occurred while deleting the job.')

        return {'message': 'Job deleted successfully'}, 200
