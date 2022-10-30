from flask_restful import Resource
from models.application_model import ApplicationModel
from flask_jwt_extended import get_jwt_identity, jwt_required
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

        # Return all applications
        return {'applications': [application.to_dict() for application in applications]}, 200
