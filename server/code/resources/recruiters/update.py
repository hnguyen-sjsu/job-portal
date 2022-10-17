from flask_restful import Resource, reqparse
from models.recruiter_model import RecruiterModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from helpers import dict_to_camel_case
from flask_smorest import abort


class UpdateRecruiterProfile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("company_name",
                        type=str,
                        required=True,
                        help="company_name cannot be left blank")

    parser.add_argument("company_size",
                        type=int,
                        required=True,
                        help="company_size cannot be left blank")

    parser.add_argument("industry",
                        type=str,
                        required=True,
                        help="industry cannot be left blank")

    parser.add_argument("company_logo_url",
                        type=str,
                        required=True,
                        help="company_logo_url cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            abort(401, message='Unauthorized')

        data = UpdateRecruiterProfile.parser.parse_args()
        recruiter = RecruiterModel.find_by_user_id(
            get_jwt_identity().get('user_id'))

        # Check if recruiter exists
        if recruiter is None:
            abort(404, message='Recruiter not found')

        # Update recruiter's profile
        recruiter.update(recruiter.id, **data)

        return dict_to_camel_case(recruiter.to_dict()), 201
