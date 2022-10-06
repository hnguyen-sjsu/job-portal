from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from response_message_code import response_custom_message


class DeleteJob(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("job_id",
                        type=int,
                        required=True,
                        help="job_id cannot be left blank")

    @classmethod
    @jwt_required()
    def delete(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        data = DeleteJob.parser.parse_args()

        job = JobModel.find_by_id(data['job_id'])

        if not job:
            return {"message": "Job not found"}, 404

        job.delete_from_db()

        return response_custom_message("message", "Job deleted successfully", 200)
