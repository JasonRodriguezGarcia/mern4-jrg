from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from models.base import Base
from models.dept import Dept

# Base = declarative_base()

class Emp(Base):
    __tablename__ = 'emp'
    __table_args__ = {'schema': 'scott'}  # specify schema

    empno = Column(Integer, primary_key=True)
    ename = Column(String)
    job = Column(String)
    mgr = Column(Integer)
    hiredate = Column(String)  # You might want to use Date type here if appropriate
    sal = Column(Numeric)
    comm = Column(Numeric)
    # deptno = Column(Integer)

    deptno = Column(Integer, ForeignKey('scott.dept.deptno'))   
    department = relationship(Dept, back_populates='employees')
    def __repr__(self):
        return f"<Emp(empno={self.empno}, ename='{self.ename}', job='{self.job}')>"

    def __str__(self):
            # nicer string for print()
            return f"Employee {self.empno}: {self.ename} - {self.job}"