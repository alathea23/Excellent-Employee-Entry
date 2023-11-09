//Setting up packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const {
  addEmployee,
  viewEmployees,
  updateEmployee,
  viewRoles,
  addRole,
  viewDepartments,
  addDepartment,
} = require("./utils/Database_Queries.js");

const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const { async } = require("rxjs");

const PORT = process.env.PORT || 3004;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Remembrall23**',
      database: 'EmployeeTracker_db',
    },
    console.log(`Connected to the EmployeeTracker_db database.`)
  );

  const query = util.promisify(db.query).bind(db);
/*
//let answers = []
//adding in dummy testing data to test functionality
let dataD = {
  first_name: "A",
  last_name: "Rod",
  role_id: 2,
  manager_id: 2,
};

let dataU = {
  role_id: 1,
  employee_id: 8,
};

function addEmployee(data) {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role_id}, NULL `
  );
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
}

function updateEmployee(data) {
  db.query(
    `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.employee_id};`
  );
  db.query(
    "SELECT * FROM employee WHERE id=?",
    data.employee_id,
    function (err, results) {
      console.log(results);
    }
  );
}

function viewRoles(data) {
  db.query("SELECT title FROM roles", function (err, results) {
    console.log(results);
    const roles = results;
  });
}

function viewEmployees() {
  db.query(
    "SELECT first_name, last_name FROM employee",
    function (err, results) {
      console.log(results);
    }
  );
}
//addEmployee(dataD)
//updateEmployee (dataU)
viewRoles();
viewEmployees();
*/ 
/*
let roles = []

function viewRolesTest(data) {
    db.query("SELECT title FROM roles", function (err, results) {
      //console.log(results);
      const rolesRaw = results
      roles = rolesRaw.title;
    });
  }
viewRolesTest()
console.log(roles)

async function getRoles() {
    try {
        const results = await db.query('SELECT title FROM roles');
        const rolesRaw = results
        return rolesRaw.title;
      }
      catch (error) {
        throw error;
      }
  }

  getRoles().then((title) => {
    console.log(`title: ${title}`)
  })
  
  getRoles((title) => {
    console.log(`Username: ${title}`); // Access the variable inside the callback
  });

*/

//Creating an array of questions for user input
function displayMenu() {
  let roles = db.query("SELECT title FROM roles", function (err, results) {
    //console.log(results)
});
   // const roles = rolesRaw.results
  //  console.log(roles)
  let employees = db.query("SELECT first_name, last_name FROM employee");
  let departments = db.query("SELECT name FROM department");

  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "Add Employee",
          "Update Employee Role",
          "View Departments",
          "Add Department",
          "View Roles",
          "Add Role",
          "Quit",
        ],
        name: "task",
      },
      {
        type: "input",
        name: "Department_name",
        message: "Department name?",
        when: (answers) => answers.task  === "Add Department",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a value.";
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      console.log(answers);
      const selectedOption = answers.task ;

      // Handle the selected option
      switch (selectedOption) {
        case "Add Employee":
            await
          await addEmployee(answers);
          console.log("Input 1:", answers.input1);
          break;
        case "View Employees":
          viewEmployees(answers);
          console.log("You selected Option 2");
          console.log("Input 2:", answers.input2);
          break;
        case "View Role":
          viewRoles(answers);
          console.log("You selected Option 1");
          console.log("Input 1:", answers.input1);
          break;
        case "Add Roles":
          addRole(answers);
          console.log("You selected Option 2");
          console.log("Input 2:", answers.input2);
          break;
        case "View Departments":
          viewDepartments(answers);
          console.log("You selected Option 1");
          console.log("Input 1:", answers.input1);
          break;
        case "Add Departments":
          addDepartment(answers);
          console.log("You selected Option 2");
          console.log("Input 2:", answers.input2);
          break;
        case "Update Role":
          updateEmployee(answers);
          console.log("You selected Option 2");
          console.log("Input 2:", answers.input2);
          break;
        case "Quit":
          console.log("Goodbye!");
          return;
      }

      // After handling the selected option, display the menu again
      displayMenu();
    });
}

// Start the menu
displayMenu();
/*
//function to write output to README file
function writeFile(answers) {
  fileName = answers.title + "README.md";
  (writeText = markdown(answers)),
    //console to test code
    console.log(fileName);
  console.log(writeText);

  fs.writeFile(fileName, writeText, (err) =>
    err ? console.error(err) : console.log("Professional README created!")
  );
}

//function to initialize app
//source for async function fix for command line: https://stackoverflow.com/questions/62860243/inquirer-prompt-exiting-without-an-answer
async function init() {
  const port = process.env.PORT || 3001;
  await questions;
  writeFile(answers);
}

// Function call to initialize app
init();
*/