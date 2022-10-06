from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import jwt_required, get_jwt_identity


class GetAll(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        jobs = JobModel.find_all()

        return {"jobs": [job.to_dict() for job in jobs]}, 200


class GetOne(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("job_id",
                        type=int,
                        required=True,
                        help="job_id cannot be left blank")

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        data = GetOne.parser.parse_args()
        job = JobModel.find_by_id(data["job_id"])
        jobs_belong_to_user = JobModel.find_all_by_uid(
            get_jwt_identity().get('user_id'))

        if job and job in jobs_belong_to_user:
            return job.to_dict(), 200

        return {"message": "Job not found"}, 404


class GetTen(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("offset",
                        type=int,
                        required=True,
                        help="offset cannot be left blank")

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        data = GetTen.parser.parse_args()
        jobs = JobModel.find_ten(offset=data['offset'])

        return {"jobs": [job.to_dict() for job in jobs]}, 200


class GetAllByUID(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        user_id = get_jwt_identity().get('user_id')
        jobs = JobModel.find_all_by_uid(user_id)

        return {"jobs": [job.to_dict() for job in jobs]}, 200
