from flask_restful import Resource, reqparse
from models.job_model import JobModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from response_message_code import response_message_code
from flask_restful import inputs


class Add(Resource):
    parser = reqparse.RequestParser()
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
    def post(cls):
        if get_jwt_identity().get('role') != 'recruiter':
            return {'message': 'Unauthorized'}, 401

        data = Add.parser.parse_args()

        if data['salary_min'] > data['salary_max']:
            return {"message": "salary_min cannot be greater than salary_max"}, 400

        if data['start_date'] > data['end_date']:
            return {"message": "start_date cannot be greater than end_date"}, 400

        user_id = get_jwt_identity().get('user_id')

        new_job = JobModel(title=data["title"],
                           start_date=data["start_date"],
                           end_date=data["end_date"],
                           location=data["location"],
                           type=data["type"],
                           category=data["category"],
                           experience_level=data["experience_level"],
                           salary_min=data["salary_min"],
                           salary_max=data["salary_max"],
                           description=data["description"],
                           user_id=user_id)

        try:
            new_job.save_to_db()
        except Exception as e:
            print(e)
            return {"message": "An error occurred while creating the job."}, 500

        return {"message": "Job created successfully."}, 201
