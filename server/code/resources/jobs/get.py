from struct import unpack
from flask_restful import Resource, reqparse
from models.job_model import JobModel
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from helpers import dict_to_camel_case
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields


def unpack_jobs(jobs, get_one=False):
    results_list = {'jobs': []}

    if get_one:
        results = {}
        job, company = jobs
        results['jobs'] = dict_to_camel_case(job.to_dict())
        results['company'] = dict_to_camel_case(company.to_dict())
        results_list['jobs'].append(results)
    else:
        for job, company in jobs:
            results = {}
            results['jobs'] = dict_to_camel_case(job.to_dict())
            results['company'] = dict_to_camel_case(company.to_dict())

            results_list['jobs'].append(results)

    return results_list


class GetAll(Resource):

    @classmethod
    def get(cls):
        jobs_company = JobModel.find_all()

        # Create an empty dict to store the child dicts.
        results_list = unpack_jobs(jobs_company)

        return results_list, 200


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

        jobs_company = JobModel.find_ten(offset=offset)

        # Create an empty dict to store the child dicts.
        results_list = unpack_jobs(jobs_company)

        return results_list, 200


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
        job_company = JobModel.find_by_job_id(job_id)
        user_id = get_jwt_identity().get('user_id')

        # Check if the job belongs to the recruiter.
        if job_company and job_company[0].user_id == user_id:
            result = unpack_jobs(job_company, get_one=True)
            return result, 200

        return {"message": "Job not found"}, 404


class GetAllByUID(Resource):

    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        user_id = get_jwt_identity().get('user_id')

        # Get all jobs and company info that belong to the current recruiter.
        jobs_company = JobModel.find_all_by_uid(user_id)

        # Create an empty dict to store the child dicts.
        results_list = unpack_jobs(jobs_company)

        return results_list, 200
