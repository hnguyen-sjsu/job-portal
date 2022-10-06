from db import db


class CandidateModel(db.Model):
    __tablename__ = 'candidates'
    id = db.Column(db.Integer(), primary_key=True)
    full_name = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    bio = db.Column(db.Text(), nullable=False)
    resume_url = db.Column(db.String(), nullable=False)

    # Foreign key that references to the user id in the users table.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)
    # education = db.relationship('Education', backref='candidates',
    #                             lazy=True, cascade='all, delete-orphan')
    # work_experience = db.relationship(
    #     'WorkExperience', backref='candidates', lazy=True, cascade='all, delete-orphan')
    # skills = db.relationship(
    #     'Skill', backref='candidates', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    # Constructor
    def __init__(self, user_id, full_name="", location="", phone_number="", bio="", resume_url=""):
        self.full_name = full_name
        self.location = location
        self.phone_number = phone_number
        self.bio = bio
        self.resume_url = resume_url
        self.user_id = user_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def update(cls, _id, full_name="", location="", phone_number="", bio="", resume_url=""):
        # find candidate
        candidate = cls.query.filter_by(id=_id).first()
        # update candidate profile
        candidate.full_name = full_name
        candidate.location = location
        candidate.phone_number = phone_number
        candidate.bio = bio
        candidate.resume_url = resume_url
        # save to db
        db.session.commit()

    # @classmethod
    # def delete_by_user_id(cls, user_id):
    #     user = cls.query.filter_by(user_id=user_id).first()
    #     db.session.delete(user)
    #     db.session.commit()
