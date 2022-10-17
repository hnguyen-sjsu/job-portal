from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import inputs
from to_camel_case import dict_to_camel_case
from flask_smorest import abort


class UpdateJob(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("job_id",
                        type=int,
                        required=True,
                        help="job_id cannot be left blank")

    parser.add_argument("title",
                        type=str,
                        required=True,
                        help="title cannot be left blank")

    parser.add_argument("start_date",
                        type=inputs.date,
                        required=True,
                        help="start_date cannot be left blank")

    parser.add_argument("end_date",
                        type=inputs.date,
                        required=True,
                        help="end_date cannot be left blank")

    parser.add_argument("location",
                        type=str,
                        required=True,
                        help="location cannot be left blank")

    parser.add_argument("type",
                        type=str,
                        required=True,
                        help="type cannot be left blank")

    parser.add_argument("category",
                        type=str,
                        required=True,
                        help="category cannot be left blank")

    parser.add_argument("experience_level",
                        type=str,
                        required=True,
                        help="experience_level cannot be left blank")

    parser.add_argument("salary_min",
                        type=int,
                        required=True,
                        help="salary_min cannot be left blank")

    parser.add_argument("salary_max",
                        type=int,
                        required=True,
                        help="salary_max cannot be left blank")

    parser.add_argument("description",
                        type=str,
                        required=True,
                        help="description cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        data = UpdateJob.parser.parse_args()

        # Check if salary_min is less than salary_max
        if data['salary_min'] is not None and data['salary_max'] is not None:
            if data['salary_min'] > data['salary_max']:
                abort(400, message='salary_min cannot be greater than salary_max')

        # Check if start_date is less than end_date
        if data['start_date'] is not None and data['end_date'] is not None:
            if data['start_date'] > data['end_date']:
                abort(400, message='start_date cannot be greater than end_date')

        # Find job by job_id
        job = JobModel.find_by_job_id(data['job_id'])

        # Find all jobs that current candidate has posted
        uid = get_jwt_identity().get('user_id')

        jobs = JobModel.find_all_by_uid(uid)
        if job not in jobs:
            abort(403, message='You are not authorized to update this job')

        # Call update method on Job model and pass in data
        job_to_update = JobModel.update(**data)

        if job_to_update is None:
            abort(500, message='An error occurred while updating the job')

        return {'updatedJob': dict_to_camel_case(job_to_update.to_dict())}, 200
