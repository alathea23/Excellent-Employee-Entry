//Setting up packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
  quit,
} = require("./utils/Database_Queries.js");

const {
  newEmployeeQuestions,
  newRoleQuestions,
  updateEmployeeQuestions,
  newDepartmentQuestions,
} = require("./utils/inquirerSubQuestions");

const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const { async } = require("rxjs");

const PORT = process.env.PORT || 3004;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//node const query = util.promisify(db.query).bind(db);
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
      const selectedOption = answers.task;

      // Handle the selected option
      switch (selectedOption) {
        case "Add Employee":
          await inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "Employee first name?",
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please enter a value.";
                  }
                  return true;
                },
              },
              {
                type: "input",
                name: "last_name",
                message: "Employee last name?",
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please enter a value.";
                  }
                  return true;
                },
              },
              {
                type: "list",
                name: "role_id",
                message: "Employee role?",
                choices: () => getRoles(),
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please Select a Role.";
                  }
                  return true;
                },
              },
              {
                type: "list",
                name: "manager_id",
                message: "Manager?",
                choices: () => getEmployees(),
              },
            ])
            .then(async (answers) => {
              console.log(answers);
              const variableValues = answers;
              addEmployee(variableValues);
              displayMenu();
            });
          break;
        case "View Employees":
          viewEmployees();
          console.log("You selected Option 2")
          displayMenu();
          break;
        case "View Roles":
          viewRoles();
          console.log("You selected Option 1")
          displayMenu();
          break;
        case "Add Role":
          const departmentList = await getDepartments()
          inquirer.prompt([
              {
                type: "input",
                name: "title",
                message: "Title of role?",
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please enter a value.";
                  }
                  return true;
                },
              },
              {
                type: "input",
                name: "salary",
                message: "Salary?",
                validate: (input) => {
                  if (isNaN(input) || input.trim() === "") {
                    return "Please enter a valid salary (numeric value).";
                  }
                  return true;
                },
              },
              {
                type: "list",
                name: "department_id",
                message: "Department?",
                choices: departmentList,
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please Enter a department.";
                  }
                  return true;
                },
              },
            ])
            .then(async (answers) => {
              addRole(answers);
              displayMenu();
            });
          break;
        case "View Departments":
          viewDepartments();
          //console.log("You selected Option 1")
          displayMenu();
          break;
        case "Add Department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Department Name?",
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please enter a value.";
                  }
                  return true;
                },
              },
            ])
            .then(async (answers) => {
              addDepartment(answers);
              displayMenu();
            });
          break;
        case "Update Employee Role":
          const employeeList = await getEmployees();
          const employeeRoles = await getRoles();
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee_id",
                message: "Select an Employee:",
                choices: employeeList,
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please Select an Employee:";
                  }
                  return true;
                },
              },
              {
                type: "list",
                name: "role_id",
                message: "Select a Role:",
                choices: employeeRoles,
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Please Select a Role:";
                  }
                  return true;
                },
              },
            ])

            .then(async (answers) => {
              console.log(answers);
              updateEmployee(answers);
              displayMenu();
              // const variableValues = answers;
              //  return variableValues;
            });
          //  updateEmployee(answers);
          // console.log("You selected Option 2");
          //console.log("Input 2:", answers.input2);
          break;
        case "Quit":
          console.log("Goodbye!");
          console.log("^C")
          return;
      }

      // After handling the selected option, display the menu again
      // displayMenu();
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
