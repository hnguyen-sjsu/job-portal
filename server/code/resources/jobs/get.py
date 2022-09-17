from flask_restful import Resource, reqparse
from models.job_model import Job
from flask_jwt_extended import jwt_required, get_jwt_identity


class GetAll(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        jobs = Job.find_all()

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
        data = GetOne.parser.parse_args()
        job = Job.find_by_id(data["job_id"])
        jobs_belong_to_user = Job.find_all_by_uid(get_jwt_identity())

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
        data = GetTen.parser.parse_args()
        jobs = Job.find_ten(offset=data['offset'])

        return {"jobs": [job.to_dict() for job in jobs]}, 200


class GetAllByUID(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        uid = get_jwt_identity()
        jobs = Job.find_all_by_uid(uid)

        return {"jobs": [job.to_dict() for job in jobs]}, 200
