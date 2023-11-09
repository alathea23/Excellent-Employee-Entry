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
  getRoles,
  getEmployees,
  getDepartments,
  fullEmployeeData,
  quit
} = require("./utils/Database_Queries.js");

const {
    newEmployeeQuestions,
    newRoleQuestions,
    updateEmployeeQuestions,
    newDepartmentQuestions,
} = require("./utils/inquirerSubQuestions.js");

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

*/
//Creating an array of questions for user input
function displayMenu() {

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
    ])
    .then(async (answers) => {
      console.log(answers);
      const selectedOption = answers.task ;

      // Handle the selected option
      switch (selectedOption) {
        case "Add Employee":
          await newEmployeeQuestions(),
          console.log(variableValues)
          console.log(data)
          await addEmployee(variableValues)
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