from flask_restful import Resource
from models.application_model import ApplicationModel
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from helpers import dict_to_camel_case
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort


class GetAllApplicationsByUID(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'candidate':
            abort(403, message='You are not authorized to access this resource.')

        # Get all applications by user id
        try:
            applications = ApplicationModel.find_by_user_id(
                get_jwt_identity().get('user_id'))
        except SQLAlchemyError as e:
            print(e)
            abort(500, message='An error occurred while getting the applications')

        # Check if there are no applications
        if not applications:
            return {'applications': []}, 200
        results = []
        # Get job info for each application
        for application in applications:
            application = dict_to_camel_case(application.to_dict())
            job_info = JobModel.find_by_job_id(application['jobId'])
            application['jobInfo'] = dict_to_camel_case(job_info.to_dict())
            results.append(application)

        # Return all applications
        return {'applications': results}, 200
