from flask_restful import Resource, reqparse
from models.job_model import JobModel
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from to_camel_case import dict_to_camel_case
from flask_smorest import abort


def add_logo_to_job(job):
    # find company logo
    logo = RecruiterModel.find_logo_by_uid(job.user_id)
    job_dict = job.to_dict()
    job_dict['companyLogo'] = logo
    return job_dict


class GetAll(Resource):

    @classmethod
    def get(cls):
        jobs = JobModel.find_all()
        returned_jobs = []
        for job in jobs:
            returned_jobs.append(add_logo_to_job(job))

        return {'jobs': returned_jobs}, 200


class GetTen(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("offset",
                        type=int,
                        required=True,
                        help="offset cannot be left blank")

    @classmethod
    def get(cls):
        data = GetTen.parser.parse_args()
        jobs = JobModel.find_ten(offset=data['offset'])
        returned_jobs = []
        for job in jobs:
            # remove user_id from job
            returned_jobs.append(add_logo_to_job(job))

        return {'jobs': returned_jobs}, 200


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
            abort(401, message="Unauthorized")

        data = GetOne.parser.parse_args()
        # Find the job based on job_id.
        job = JobModel.find_by_job_id(data["job_id"])
        # Find all jobs that belong to the current recruiter.
        jobs_belong_to_user = JobModel.find_all_by_uid(
            get_jwt_identity().get('user_id'))

        if job and job in jobs_belong_to_user:
            return dict_to_camel_case(job.to_dict()), 200

        return {"message": "Job not found"}, 404


class GetAllByUID(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        user_id = get_jwt_identity().get('user_id')
        # Get all jobs by user_id
        jobs = JobModel.find_all_by_uid(user_id)
        returned_jobs = []
        for job in jobs:
            returned_jobs.append(add_logo_to_job(job))

        return {'jobs': returned_jobs}, 200
