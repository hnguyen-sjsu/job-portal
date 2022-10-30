from models.recruiter_model import RecruiterModel
from models.candidate_model import CandidateModel
from models.application_model import ApplicationModel
from models.user_model import UserModel
from db import db
from sqlalchemy.types import Date
import datetime


class JobModel(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    start_date = db.Column(Date(), nullable=False)
    end_date = db.Column(Date(), nullable=False)
    location = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    experience_level = db.Column(db.String(80), nullable=False)
    salary_min = db.Column(db.Integer(), nullable=False)
    salary_max = db.Column(db.Integer(), nullable=False)
    description = db.Column(db.Text(), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)  # foreign key to user id.
    # Create a relationship between the job and application.
    applications = db.relationship(
        'ApplicationModel', backref='jobs', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, title, description, location, category, type, experience_level, salary_min, salary_max, start_date, end_date, user_id):
        self.title = title
        self.description = description
        self.location = location
        self.type = type
        self.category = category
        self.experience_level = experience_level
        self.salary_min = salary_min
        self.salary_max = salary_max
        self.start_date = start_date
        self.end_date = end_date
        self.user_id = user_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def delete_from_db(cls, _id):
        db.session.delete(cls.query.filter_by(id=_id).first())
        db.session.commit()

    @classmethod
    def remove_expired_jobs(cls):
        expired_jobs = cls.query.filter(
            cls.end_date < datetime.datetime.now()).all()
        for job in expired_jobs:
            job.delete_from_db()

    @classmethod
    def find_all_joined_results(cls):
        jobs_company = JobModel.query.\
            join(RecruiterModel, JobModel.user_id == RecruiterModel.user_id).\
            add_columns(RecruiterModel).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            all()

        return jobs_company

    @classmethod
    def find_ten_joined_results(cls, offset):
        """
        Return 10 jobs in the database starting from index (offset + 1)
        The front end should keep track of the offset and increment it by 10 each time the user scrolls down or presses load more.
        """
        jobs_company = JobModel.query.\
            join(RecruiterModel, JobModel.user_id == RecruiterModel.user_id).\
            add_columns(RecruiterModel).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            offset(offset).limit(10).all()

        return jobs_company

    @classmethod
    def find_all_joined_results_by_uid(cls, user_id):
        # Join the JobModel table with the RecruiterModel table where user_id = user_id.
        jobs_company_application = JobModel.query.\
            join(RecruiterModel, JobModel.user_id == RecruiterModel.user_id).\
            join(ApplicationModel, JobModel.id == ApplicationModel.job_id).\
            add_columns(RecruiterModel, ApplicationModel).\
            order_by(JobModel.id).\
            filter(JobModel.user_id == user_id).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            all()

        return jobs_company_application

    @classmethod
    def find_all_jobs_by_uid(cls, user_id):
        return cls.query.filter_by(user_id=user_id).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            all()

    @classmethod
    def find_by_job_id(cls, job_id):
        return cls.query.filter_by(id=job_id).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            first()

    @classmethod
    def find_one_joined_result_by_job_id(cls, id):
        # Join the JobModel table with the RecruiterModel table where job_id = id.
        job_company_applications = JobModel.query.\
            join(RecruiterModel, JobModel.user_id == RecruiterModel.user_id).\
            join(ApplicationModel, JobModel.id == ApplicationModel.job_id).\
            add_columns(RecruiterModel, ApplicationModel).\
            filter(JobModel.id == id).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            all()

        return job_company_applications

    # Where client store the job id?
    @classmethod
    def update(cls, **kwargs):
        job = cls.query.filter_by(id=kwargs['job_id']).first()
        if job:
            for key, value in kwargs.items():
                setattr(job, key, value)

            job.save_to_db()
            return job

        return None

    # Testing join tables
    @classmethod
    def get_joined_table(cls, user_id):
        # Join the JobModel table with the RecruiterModel table.
        print(user_id)
        jobs_company_application = JobModel.query.\
            join(RecruiterModel, JobModel.user_id == RecruiterModel.user_id).\
            join(ApplicationModel, JobModel.id == ApplicationModel.job_id).\
            add_columns(RecruiterModel, ApplicationModel).\
            order_by(JobModel.id).\
            filter(JobModel.user_id == user_id).\
            filter(JobModel.end_date > datetime.datetime.now()).\
            all()

        return jobs_company_application

    @ classmethod
    def is_owner(cls, user_id, job_id):
        job = cls.query.filter_by(id=job_id).first()
        if job:
            if job.user_id == user_id:
                return True
            return False

        return False
