from db import db
from sqlalchemy.types import Date


class ApplicationModel(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    status = db.Column(db.String(80), nullable=False)

    # Foreign key to candidate id.
    candidate_id = db.Column(db.Integer, db.ForeignKey(
        'candidates.id'), nullable=False)
    # Foreign key to job id.
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, status, candidate_id, job_id):
        self.status = status
        self.candidate_id = candidate_id
        self.job_id = job_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def delete_by_id(cls, _id):
        db.session.delete(cls.query.filter_by(id=_id).first())
        db.session.commit()

    @classmethod
    def find_all(cls):
        applications = cls.query.all()

        return applications

    @classmethod
    def find_all_by_candidate_id(cls, candidate_id):
        applications = cls.query.filter_by(candidate_id=candidate_id).first()

        return applications

    @classmethod
    def find_by_application_id(cls, application_id):
        application = cls.query.filter_by(id=application_id).first()

        return application

    @classmethod
    def update(cls, **kwargs):
        application = cls.query.filter_by(id=kwargs['application_id']).first()
        if application:
            for key, value in kwargs.items():
                setattr(application, key, value)

            application.save_to_db()
            return application

        return None
