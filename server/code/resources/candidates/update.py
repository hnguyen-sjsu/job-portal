from flask_restful import Resource, reqparse
from models.candidate_model import CandidateModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from to_camel_case import dict_to_camel_case


class UpdateCandidateProfile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("full_name",
                        type=str,
                        required=True,
                        help="full_name cannot be left blank")

    parser.add_argument("location",
                        type=str,
                        required=True,
                        help="location cannot be left blank")

    parser.add_argument("location",
                        type=str,
                        required=True,
                        help="location cannot be left blank")

    parser.add_argument("bio",
                        type=str,
                        required=True,
                        help="bio cannot be left blank")

    parser.add_argument("resume_url",
                        type=str,
                        required=True,
                        help="resume_url cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        if get_jwt_identity().get('role') != 'candidate':
            return {'message': 'Not authorized'}, 401

        data = UpdateCandidateProfile.parser.parse_args()
        candidate = CandidateModel.find_by_user_id(
            get_jwt_identity().get('user_id'))

        # Check if candidate exists
        if candidate is None:
            return {"message": "Candidate not found"}, 404

        # Update candidate's profile
        candidate.update(candidate.id, **data)

        return dict_to_camel_case(candidate.to_dict()), 201
