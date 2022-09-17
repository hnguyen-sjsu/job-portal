from flask_restful import Resource, reqparse
from models.job_model import Job
from flask_jwt_extended import get_jwt_identity, jwt_required


class UpdateJob(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("job_id",
                        type=int,
                        required=True,
                        help="job_id cannot be left blank")

    parser.add_argument("company_name", type=str, required=True,
                        help="company_name cannot be left blank")

    parser.add_argument("company_logo_url", type=str, required=True,
                        help="company_logo_url cannot be left blank")

    parser.add_argument("title", type=str, required=True,
                        help="title cannot be left blank")

    parser.add_argument("description", type=str, required=True,
                        help="description cannot be left blank")

    parser.add_argument("location", type=str, required=True,
                        help="location cannot be left blank")

    parser.add_argument("type", type=str, required=True,
                        help="type cannot be left blank")

    parser.add_argument("experience_level", type=str, required=True,
                        help="experience_level cannot be left blank")

    parser.add_argument("salary_min", type=int, required=True,
                        help="salary_min cannot be left blank")

    parser.add_argument("salary_max", type=int, required=True,
                        help="salary_max cannot be left blank")

    parser.add_argument("days_until_expired", type=int, required=True,
                        help="days_until_expired cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        data = UpdateJob.parser.parse_args()

        # Check if salary_min is less than salary_max
        if data['salary_min'] is not None and data['salary_max'] is not None:
            if data['salary_min'] > data['salary_max']:
                return {"message": "salary_min cannot be greater than salary_max"}, 400

        # Check if days_until_expired is greater than 0
        if data['days_until_expired'] is not None:
            if data['days_until_expired'] < 0:
                return {"message": "days_until_expired cannot be less than 0"}, 400

        # Find job by job_id
        job = Job.find_by_id(data["job_id"])

        # Find all jobs that current employer has posted
        uid = get_jwt_identity()

        jobs = Job.find_all_by_uid(uid)
        if job not in jobs:
            return {"message": "You do not have permission to update this job"}, 403

        # Call update method on Job model and pass in data
        job_to_update = Job.update(**data)

        if job_to_update is None:
            return {"message": "Internal Server Error"}, 500

        return {"updated_job": job_to_update.to_dict()}, 200
