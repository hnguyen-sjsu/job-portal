from flask_restful import Resource
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from helpers import dict_to_camel_case
from flask_smorest import abort


class GetRecruiterProfile(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            abort(401, message='Unauthorized')

        # get recruiter by user_id
        recruiter = RecruiterModel.find_by_user_id(
            get_jwt_identity().get('user_id'))

        if recruiter is None:
            abort(404, message='Recruiter not found')

        return dict_to_camel_case(recruiter.to_dict()), 200
