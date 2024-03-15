use employees;

INSERT INTO department
    (name)
VALUES
    ('Managment'),
    ('Electronics'),
    ('Human Resources'),
    ('Guest Service'),
    ('clothing');

INSERT INTO role
    (role_name, department_id)
VALUES
    ("Store Director", 1),
    ('Cashier', 4),
    ('HR', 3),
    ('Tech', 2),
    ('Drive Ups', 4),
    ('Returns', 4),
    ('Style', 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Director', 'One', 1, NULL),
    ('Cashier', 'One', 2, NULL),
    ('Cashier', 'Two', 2, NULL),
    ('AAA', 'AAA', 6, NULL);
