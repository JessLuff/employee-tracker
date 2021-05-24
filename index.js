const mysql = require('mysql');
const inquirer = require('inquirer');
//const addDepartment = require('./functions');


// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'SQLp310!',
  database: 'company_db',
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'function',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View Employees', 'View Roles', 'View Departments', 'Add Employee', 'Add Role', 'Add Department'],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.function === 'View Employees') {
        viewEmployee();
      } else if (answer.function === 'View Roles') {
        viewRoles();
    } else if (answer.function === 'View Departments') {
        viewDepartments();
    } else if (answer.function === 'Add Employee') {
        addEmployee();
    } else if (answer.function === 'Add Role') {
        addRole();
    } else if (answer.function === 'Add Department') {
        addDepartment();
      } else {
        connection.end();
      }
    });
};

const addDepartment = () => {
    // prompt for info about the department
    inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'What is the name of the department?',
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          'INSERT INTO department SET ?',

          {
            name: answer.name,
          },
          (err) => {
            if (err) throw err;
            console.log('The information was added successfully!');
            // re-prompt the user for next function
            start();
          }
        );
      });
  };

  const addRole = () => {
      connection.query('SELECT * FROM department', (err, results) => {
          if (err) throw err;
    // prompt for info about the department
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of this role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of this role?',
        },
        {
            name: 'choice',
            type: 'rawlist',
            choices() {
                const choiceArray = [];
                results.forEach(({ name }) => {
                    choiceArray.push(name);
                });
                return choiceArray;
            },
            message: 'What department is this role in?',
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        let chosenDepartment;
        results.forEach((department) => {
            if (department.name === answer.choice) {
                chosenDepartment = department;
            }
        });
        connection.query(
          'INSERT INTO role SET ?',
          [
          {
            title: answer.title,
            salary: answer.salary,
            department_id: chosenDepartment.id,
          },
        ],
          (err) => {
            if (err) throw err;
            console.log('The information was added successfully!');
            // re-prompt the user for next function
            start();
          }
        );
      });
      });
  };

  const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
  // prompt for info about the department
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
          name: 'last_name',
          type: 'input',
          message: 'What is the last name of the employee?',
      },
      {
          name: 'choice',
          type: 'rawlist',
          choices() {
              const choiceArray = [];
              results.forEach(({ title }) => {
                  choiceArray.push(title);
              });
              return choiceArray;
          },
          message: 'What role is this employee in?',
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      let chosenRole;
      results.forEach((role) => {
          if (role.title === answer.choice) {
              chosenRole = role;
          }
      });
      connection.query(
        'INSERT INTO employee SET ?',
        [
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: chosenRole.id,
        },
      ],
        (err) => {
          if (err) throw err;
          console.log('The information was added successfully!');
          // re-prompt the user for next function
          start();
        }
      );
    });
    });
};




// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


module.exports = start;