from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy.orm import relationship # añadiendo objeto de alchermi
from models.base import Base

# Base = declarative_base()

class Dept(Base):
    __tablename__ = 'dept'
    __table_args__ = {'schema': 'scott'}  # specify schema

    deptno = Column(Integer, primary_key=True)
    dname = Column(String)
    loc = Column(String)
    budget = Column(Integer)

    employees = relationship('Emp', back_populates='department') # definicion relaciones

    # def __repr__(self):
    #     return f"<Dept(deptno={self.deptno}, dname='{self.dname}', loc='{self.loc}', budget='{self.budget}')>"

    def __str__(self):
            # nicer string for print()
            return f"Department {self.deptno}: {self.dname} - {self.loc} - {self.budget}"