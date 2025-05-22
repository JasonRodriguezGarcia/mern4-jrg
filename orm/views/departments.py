from db_pg import get_session
from models.dept import Dept

def get_all_departments():
    # Crear una sesión de conexión a la base de datos
    session = get_session()
    try:
        # Consultar todos los registros de la tabla Dept
        departments = session.query(Dept).all()
        # Devolver la lista de Departamentos
        return departments
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()

def show_depts_and_emps():
    session = get_session()
    try:
        depts = session.query(Dept).all()
        for dept in depts:
            print(f"Department {dept.deptno} - {dept.dname} ({dept.loc})")
            for emp in dept.employees:
                print(f"  Employee {emp.empno}: {emp.ename} - {emp.job}")
    finally:
        session.close()

def get_department_by_deptno(deptpno):
    # Crear una sesión de conexión a la base de datos
    session = get_session()
    try:
        # Consultar un departamento cuyo número (deptno) coincida con el dado
        # one_or_none() devuelve un único objeto o None si no existe
        department = session.query(Dept).filter(Dept.deptno == deptpno).one_or_none()
        # Devolver el departamento encontrado o None
        return department
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()

# def get_employees_by_job(job_title):
#     # Crear una sesión de conexión a la base de datos
#     session = get_session()
#     try:
#         # Consultar todos los empleados cuyo trabajo coincida con job_title
#         employees = session.query(Emp).filter(Emp.job == job_title).all()
#         # Devolver la lista de empleados que cumplen el filtro
#         return employees
#     finally:
#         # Cerrar la sesión para liberar recursos
#         session.close()

# def add_employee(empno, ename, job):
#     session = get_session()
#     try:
#         # Crear una nueva instancia de Emp con los datos recibidos
#         new_employee = Emp(empno=empno, ename=ename, job=job)
        
#         # Agregar el nuevo empleado a la sesión
#         session.add(new_employee)
        
#         # Confirmar la transacción para guardar los cambios en la base de datos
#         session.commit()
        
#         # Opcional: devolver el objeto agregado
#         return new_employee
#     except Exception as e:
#         # En caso de error, hacer rollback para deshacer cambios pendientes
#         session.rollback()
#         raise e
#     finally:
#         # Cerrar la sesión para liberar recursos
#         session.close()



"""


session.query(Emp) \
    .filter(Emp.sal > 50000) \
    .order_by(Emp.ename) \
    .limit(10) \
    .all()


"""