from flask_restful import Resource, reqparse
from models.job_model import JobModel
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from helpers import dict_to_camel_case
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields


def add_company_to_job(job):
    # find company logo
    company = RecruiterModel.find_by_user_id(job.user_id)
    job_dict = dict_to_camel_case(job.to_dict())
    job_dict['company'] = dict_to_camel_case(company.to_dict())
    return job_dict


class GetAll(Resource):

    @classmethod
    def get(cls):
        jobs = JobModel.find_all()
        returned_jobs = []
        for job in jobs:
            returned_jobs.append(add_company_to_job(job))

        return {'jobs': returned_jobs}, 200


class GetTenSchema(Schema):
    offset = fields.Int(required=True)


class GetTen(Resource):

    @classmethod
    def get(cls):
        # Validate offset
        errors = GetTenSchema().validate(request.args)
        if errors:
            abort(400, message=errors)

        offset = request.args.get('offset')

        jobs = JobModel.find_ten(offset=offset)
        returned_jobs = []
        for job in jobs:
            # remove user_id from job
            returned_jobs.append(add_company_to_job(job))

        return {'jobs': returned_jobs}, 200


class GetOneSchema(Schema):
    job_id = fields.Int(required=True)


class GetOne(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        # Check role
        if get_jwt_identity().get('role') != 'recruiter':
            abort(401, message="Unauthorized")

        # Validate job_id
        errors = GetOneSchema().validate(request.args)
        if errors:
            abort(400, message=errors)

        job_id = request.args.get('job_id')

        # Find the job based on job_id.
        job = JobModel.find_by_job_id(job_id)

        user_id = get_jwt_identity().get('user_id')
        # Find all jobs that belong to the current recruiter.
        jobs_belong_to_user = JobModel.find_all_by_uid(user_id)

        if job in jobs_belong_to_user:
            returned_jobs = []
            returned_jobs.append(add_company_to_job(job))
            return {"job": returned_jobs}, 200

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

        # Add company to job
        returned_jobs = []
        for job in jobs:
            returned_jobs.append(add_company_to_job(job))

        return {'jobs': returned_jobs}, 200
