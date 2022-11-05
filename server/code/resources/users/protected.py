from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from models.job_model import JobModel


class Protected(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        jobs = JobModel.get_joined_table(get_jwt_identity().get('user_id'))

        return {'jobs': [job for job in jobs]}, 200
