from flask_restful import Resource, reqparse
from models.job_model import Job
from flask_jwt_extended import get_jwt_identity, jwt_required
from response_message_code import response_message_code
from faker import Faker

faker = Faker()


class Add(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("company_name",
                        type=str,
                        required=True,
                        help="company_name cannot be left blank")

    parser.add_argument("company_logo_url",
                        type=str,
                        required=True,
                        help="company_logo_url cannot be left blank")

    parser.add_argument("title",
                        type=str,
                        required=True,
                        help="title cannot be left blank")

    parser.add_argument("description",
                        type=str,
                        required=True,
                        help="description cannot be left blank")

    parser.add_argument("location",
                        type=str,
                        required=True,
                        help="location cannot be left blank")

    parser.add_argument("type",
                        type=str,
                        required=True,
                        help="type cannot be left blank")

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

    parser.add_argument("days_until_expired",
                        type=int,
                        required=True,
                        help="days_until_expired cannot be left blank")

    @classmethod
    @jwt_required()
    def post(cls):

        data = Add.parser.parse_args()
        uid = get_jwt_identity()

        new_job = Job(company_name=data["company_name"],
                      title=data["title"],
                      description=data["description"],
                      location=data["location"],
                      type=data["type"],
                      experience_level=data["experience_level"],
                      salary_min=data["salary_min"],
                      salary_max=data["salary_max"],
                      company_logo_url=data["company_logo_url"],
                      days_until_expired=data["days_until_expired"],
                      uid=uid)

        try:
            new_job.save_to_db()

            # Create dummy data
            # for _ in range(10):
            #     new_job = Job(company_name=faker.company(), title=faker.job(), description=faker.text(), location=faker.city(), type="Full Time", experience_level="Entry Level", salary=faker.random_int(
            #         min=10000, max=100000), company_logo_url=faker.image_url(), days_until_expired=2, uid=uid)

            #     new_job.save_to_db()

            # jobs = [
            #     {
            #         'companyName': "Tiktok",
            #         'companyLogoUrl':
            #         "https://media-exp1.licdn.com/dms/image/C510BAQGCdThXIss7UQ/company-logo_100_100/0/1539940587971?e=1669852800&v=beta&t=b1beRqizKA32xZQFV5epGcUuk0jkP8gWlzBlE9UzSUM",
            #         'title': "Software Engineer - Backend",
            #         'postedDate': "1 day ago",
            #         'description':
            #         "TikTok's product engineering team is responsible for building backend support for various kinds of new experiences for the TikTok app: User Growth, Social and Privacy. This includes ensuring our systems are scaling to handle the ever-growing user base of TikTok and expanding our reach by making our tools accessible through our open platform.",
            #         'location': "Mountain View, CA Hybrid",
            #         'type': "Full Time",
            #         'experienceLevel': "Mid-Senior Level",
            #         'salaryMin': 103000,
            #         'salaryMax': 187000
            #     },
            #     {
            #         'companyName': "Adobe",
            #         'companyLogoUrl':
            #         "https://media-exp1.licdn.com/dms/image/C560BAQFrtK-ioO1rsQ/company-logo_100_100/0/1590681827578?e=1669852800&v=beta&t=9iKHirBfEdhuRA3hbb2atnVFFtipZ6uz0esOI5wqQmI",
            #         'title': "Software Development Engineer",
            #         'postedDate': "1 week ago",
            #         'description':
            #         "Changing the world through digital experiences is what Adobe’s all about. We give everyone—from emerging artists to global brands—everything they need to design and deliver exceptional digital experiences! We’re passionate about empowering people to create beautiful and powerful images, videos, and apps, and transform how companies interact with customers across every screen.",
            #         'location': "Mountain View, CA Hybrid",
            #         'type': "Full Time",
            #         'experienceLevel': "Mid-Senior Level",
            #         'salaryMin': 122000,
            #         'salaryMax': 179000
            #     }]
            # for _ in range(10):
            #     for job in jobs:
            #         new_job = Job(company_name=job['companyName'],
            #                       title=job['title'],
            #                       description=job['description'],
            #                       location=job['location'],
            #                       type=job['type'],
            #                       experience_level=job['experienceLevel'],
            #                       salary_min=job['salaryMin'],
            #                       salary_max=job['salaryMax'],
            #                       company_logo_url=job['companyLogoUrl'],
            #                       days_until_expired=2,
            #                       uid=uid)
            #         new_job.save_to_db()
        except:
            return response_message_code("An error occurred while creating the job.", 500)

        return response_message_code("Job created successfully.", 201)
