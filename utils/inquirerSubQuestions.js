const dbQueryFunctions = require("./Database_Queries");
const inquirer = require("inquirer");

function newEmployeeQuestions() {
  inquirer
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
        choices: () => dbQueryFunctions.getRoles(),
        validate: (input) => {
          if (input.trim() === "") {
            return "Please Select a Role.";
          }
          return true;
        },
      },
    ])

    .then(async (answers) => {
      console.log(answers);
      const variableValues = answers;
      return variableValues;
    });
}

function newDepartmentQuestions() {
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
      console.log(answers);
      const variableValues = answers;
      return variableValues;
    });
}

function newRoleQuestions() {
  inquirer
    .prompt([
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
        choices: () => dbQueryFunctions.getDepartments(),
        validate: (input) => {
          if (input.trim() === "") {
            return "Please Enter a department.";
          }
          return true;
        },
      },
    ])

    .then(async (answers) => {
      console.log(answers);
      const variableValues = answers;
      return variableValues;
    });
}

function updateEmployeeQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Select an Employee:",
        choices: () => dbQueryFunctions.getEmployees(),
        validate: (input) => {
          if (input.trim() === "") {
            return "Please Select a Employee:";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "role",
        message: "Select a Role:",
        choices: () => dbQueryFunctions.getRoles(),
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
      const variableValues = answers;
      return variableValues;
    });
}


module.exports = {
  newEmployeeQuestions,
  newRoleQuestions,
  updateEmployeeQuestions,
  newDepartmentQuestions,
};
