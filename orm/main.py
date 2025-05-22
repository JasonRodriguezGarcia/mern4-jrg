from views.employees import get_all_employees, add_employee
from views.departments import get_all_departments, show_depts_and_emps, get_department_by_deptno

if __name__ == "__main__":

    # # new_emp = add_employee(8000, 'NEWNAME', 'DEVELOPER')
    # nombre = input("cual es tu nombre:")
    # new_emp = add_employee(8300, nombre, 'DEVELOPER')
    # emps = get_all_employees()
    # for emp in emps:
    #     print(emp)


    # depts = get_all_departments()
    # for dept in depts:
    #     print(dept)

    # show_depts_and_emps()

    get_department_by_deptno(8300)