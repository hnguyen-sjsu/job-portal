from db import db


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    full_name = db.Column(db.String(), nullable=False)

    # Parameterized constructor for initialization

    def __init__(self, email, password, full_name):
        self.email = email
        self.password = password
        self.full_name = full_name

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def say_hi(cls):
        return "Hello"

    # Find methods
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
