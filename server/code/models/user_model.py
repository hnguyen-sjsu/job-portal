import uuid
from db import db


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column('id', db.Text(length=36), default=lambda: str(
        uuid.uuid4()), primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    full_name = db.Column(db.String(), nullable=False)
    role = db.Column(db.String(80), nullable=False)

    job = db.relationship('Job', backref='users',
                          lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    # Parameterized constructor for initialization

    def __init__(self, email, password, full_name, role):
        self.email = email
        self.password = password
        self.full_name = full_name
        self.role = role

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def say_hi(cls):
        return "Hello"

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def delete_by_id(cls, _id):
        user = cls.query.filter_by(id=_id).first()
        db.session.delete(user)
        db.session.commit()
