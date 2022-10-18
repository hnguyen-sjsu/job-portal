from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from models.job_model import JobModel


class Protected(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        print(get_jwt_identity())
        jobs_company = JobModel.get_joined_table(
            get_jwt_identity().get('user_id'))
        return jobs_company, 200
        # return {'user': get_jwt_identity()}, 200
