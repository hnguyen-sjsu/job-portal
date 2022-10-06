from flask_restful import Resource
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from to_camel_case import dict_to_camel_case


class GetRecruiterProfile(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Not authorized'}, 401

        # get recruiter by user_id
        recruiter = RecruiterModel.find_by_user_id(
            get_jwt_identity().get('user_id'))

        if recruiter is None:
            return {'message': 'Recruiter not found'}, 404

        return dict_to_camel_case(recruiter.to_dict()), 200
