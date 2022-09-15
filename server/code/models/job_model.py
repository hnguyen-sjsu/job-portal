from db import db
from sqlalchemy.types import DateTime
import datetime


class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer(), primary_key=True)
    company_name = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    time_created = db.Column(DateTime(timezone=True))
    time_expired = db.Column(DateTime(timezone=True))
    description = db.Column(db.Text(), nullable=False)
    location = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    experience_level = db.Column(db.String(80), nullable=False)
    salary_min = db.Column(db.Integer(), nullable=False)
    salary_max = db.Column(db.Integer(), nullable=False)
    company_logo_url = db.Column(db.String(80), nullable=False)

    uid = db.Column(db.Integer, db.ForeignKey('users.id'),
                    nullable=False)  # UID from users table

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, company_name, title, description, location, type, experience_level, salary_min, salary_max, company_logo_url, days_until_expired, uid):
        self.company_name = company_name
        self.title = title
        self.description = description
        self.location = location
        self.type = type
        self.experience_level = experience_level
        self.salary_min = salary_min
        self.salary_max = salary_max
        self.company_logo_url = company_logo_url
        self.time_created = datetime.datetime.utcnow()
        self.time_expired = self.time_created + \
            datetime.timedelta(days=days_until_expired)
        self.uid = uid

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            print("Error saving to db")

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def remove_expired_jobs(cls):
        expired_jobs = cls.query.filter(
            cls.time_expired < datetime.datetime.utcnow()).all()
        for job in expired_jobs:
            db.session.delete(job)
        db.session.commit()

    @classmethod
    def find_all(cls):
        jobs = cls.query.all()  # Return all jobs in the database
        for job in jobs:
            job.time_created = job.time_created.strftime("%Y-%m-%d %H:%M:%S")

        return jobs

    @classmethod
    def find_ten(cls, offset):
        # Return 10 jobs in the database starting from index (offset + 1)
        # The front end should keep track of the offset and increment it by 10 each time the user scrolls down or presses load more.
        jobs = cls.query.offset(offset).limit(10).all()
        for job in jobs:
            job.time_created = job.time_created.strftime("%Y-%m-%d %H:%M:%S")

        return jobs

    @classmethod
    def find_all_by_uid(cls, uid):
        jobs = cls.query.filter_by(uid=uid).all()
        for job in jobs:
            job.time_created = job.time_created.strftime("%Y-%m-%d %H:%M:%S")

        return jobs

    @classmethod
    def find_by_id(cls, id):
        job = cls.query.filter_by(id=id).first()
        if job:
            job.time_created = job.time_created.strftime("%Y-%m-%d %H:%M:%S")

        return job
