const { prompt } = require("inquirer");
const db = require("./db");

loadMainPrompts();

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;

    if (choice === "VIEW_EMPLOYEES")
    {
      viewEmployees();
    }
    else
    {
      quit();
    }
  })
}




function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function quit()
{
  console.log("quitting")
  return
}