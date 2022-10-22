from db import db
from sqlalchemy.types import Date


class WorkExperienceModel(db.Model):
    __tablename__ = 'work_experience'
    id = db.Column(db.Integer(), primary_key=True)
    company_name = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(80), nullable=False)
    current_job = db.Column(db.String(80), nullable=False)
    start_date = db.Column(Date(), nullable=False)
    end_date = db.Column(Date(), nullable=False)
    description = db.Column(db.Text(), nullable=False)

    # Foreign key to user id.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)  # foreign key to user id.

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, company_name, position, current_job, start_date, end_date, description, user_id):
        self.company_name = company_name
        self.position = position
        self.current_job = current_job
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.user_id = user_id

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
        work_experiences = cls.query.all()

        return work_experiences

    @classmethod
    def find_by_uid(cls, user_id):
        work_experiences = cls.query.filter_by(user_id=user_id).first()

        return work_experiences

    @classmethod
    def find_by_work_id(cls, work_id):
        work_experiences = cls.query.filter_by(id=work_id).first()

        return work_experiences

    @classmethod
    def update(cls, **kwargs):
        work = cls.find_by_work_id(kwargs['work_id'])
        if work:
            for key, value in kwargs.items():
                setattr(work, key, value)

            work.save_to_db()
            return work

        return None
