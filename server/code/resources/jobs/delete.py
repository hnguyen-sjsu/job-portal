from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError


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
            return {"message": "Unauthorized"}, 401

        data = DeleteJob.parser.parse_args()

        job = JobModel.find_by_job_id(data['job_id'])

        if not job:
            return {"message": "Job not found"}, 404
        try:
            job.delete_from_db()
        except SQLAlchemyError as e:
            print(e)
            return {"message": "An error occurred while deleting the job"}, 500

        return {"message": "Job deleted successfully"}, 200
