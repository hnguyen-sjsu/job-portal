from db import db
import uuid


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column('id', db.Text(length=36), default=lambda: str(
        uuid.uuid4()), primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    role = db.Column(db.String(), nullable=False)

    # Create a relationship between User and CandidateModel
    candidate = db.relationship(
        'CandidateModel', backref='users', lazy=True, cascade='all, delete-orphan')

    # Create a relationship between User and RecruiterModel
    recruiter = db.relationship('RecruiterModel', backref='users',
                                lazy=True, cascade='all, delete-orphan')

    # Create a relationship between User and JobModel
    jobs = db.relationship('JobModel', backref='users',
                           lazy=True, cascade='all, delete-orphan')

    # Create a relationship between User and MembershipModel
    memberships = db.relationship(
        'MembershipModel', backref='users', lazy=True, cascade='all, delete-orphan')

    # # Create a relationship between User and EducationModel
    # educations = db.relationship(
    #     'EducationModel', backref='users', lazy=True, cascade='all, delete-orphan')

    # Create a relationship between User and SkillModel
    skills = db.relationship(
        'SkillModel', backref='users', lazy=True, cascade='all, delete-orphan')

    # # Create a relationship between User and WorkExperienceModel
    # work_experiences = db.relationship(
    #     'WorkExperienceModel', backref='users', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    # Constructor
    def __init__(self, email, password, role):
        self.email = email
        self.password = password
        self.role = role

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def delete_by_id(cls, _id):
        user = cls.query.filter_by(id=_id).first()
        db.session.delete(user)
        db.session.commit()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
