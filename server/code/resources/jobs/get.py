from flask_restful import Resource, reqparse
from models.job_model import Job
from flask_jwt_extended import jwt_required, get_jwt_identity


class GetAll(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        jobs = Job.find_all()

        return {"jobs": [job.to_dict() for job in jobs]}, 200


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
