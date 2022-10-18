from models.recruiter_model import RecruiterModel
from models.candidate_model import CandidateModel
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

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @ classmethod
    def remove_expired_jobs(cls):
        expired_jobs = cls.query.filter(
            cls.end_date < datetime.datetime.now()).all()
        for job in expired_jobs:
            job.delete_from_db()

    @ classmethod
    def find_all(cls):
        jobs = cls.query.filter(
            cls.end_date > datetime.datetime.utcnow()).all()

        return jobs

    @ classmethod
    def find_ten(cls, offset):
        # Return 10 jobs in the database starting from index (offset + 1)
        # The front end should keep track of the offset and increment it by 10 each time the user scrolls down or presses load more.
        jobs = cls.query.filter(cls.end_date > datetime.datetime.utcnow()).offset(
            offset).limit(10).all()

        return jobs

    @ classmethod
    def find_all_by_uid(cls, user_id):
        jobs = cls.query.filter_by(user_id=user_id).all()

        return jobs

    @ classmethod
    def find_by_job_id(cls, id):
        job = cls.query.filter(
            cls.end_date > datetime.datetime.utcnow()).filter_by(id=id).first()

        return job

    # Where client store the job id?
    @ classmethod
    def update(cls, **kwargs):
        job = cls.find_by_job_id(kwargs['job_id'])
        if job:
            for key, value in kwargs.items():
                setattr(job, key, value)

            job.save_to_db()
            return job

        return None
