from flask_restful import Resource
from models.candidate_model import CandidateModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from to_camel_case import dict_to_camel_case


class GetCandidateProfile(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        if get_jwt_identity().get('role') != 'candidate':
            return {'message': 'Not authorized'}, 401

        # get candidate by user_id
        candidate = CandidateModel.find_by_user_id(
            get_jwt_identity().get('user_id'))

        if candidate is None:
            return {'message': 'Candidate not found'}, 404

        return dict_to_camel_case(candidate.to_dict()), 200
