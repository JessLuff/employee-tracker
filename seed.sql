/* Seeds for SQL table.*/
USE company_db;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 60000, 1), ("Accountant", 60000, 2), ("Sales Rep", 60000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Jess", "Luff", 1), ("Jane", "Smith", 2), ("Bob", "Day", 3);