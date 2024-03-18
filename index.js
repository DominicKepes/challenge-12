const { prompt } = require("inquirer");
const db = require("./db");

async function loadMainPrompts() {
  try {
    const { choice } = await prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Quit"
      ]
    });

    switch (choice) {
      case "View All Departments":
        await viewDepartments();
        break;
      case "View All Roles":
        await viewRoles();
        break;
      case "View All Employees":
        await viewEmployees();
        break;
      case "Add a Department":
        await addDepartment();
        break;
      case "Add a Role":
        await addRole();
        break;
      case "Add an Employee":
        await addEmployee();
        break;
      case "Update an Employee Role":
        await updateEmployeeRole();
        break;
      case "Quit":
        process.exit();
      default:
        console.log("Invalid choice");
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await loadMainPrompts();
  }
}

async function viewDepartments() {
  const [rows] = await db.findAllDepartments();
  console.log("\n");
  console.table(rows);
}

async function viewRoles() {
  const [rows] = await db.findAllRoles();
  console.log("\n");
  console.table(rows);
}

async function viewEmployees() {
  const [rows] = await db.findAllEmployees();
  console.log("\n");
  console.table(rows);
}

async function addDepartment() {
  const { name } = await prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the department:"
  });

  try {
    await db.connection.promise().query(
      "INSERT INTO department SET ?",
      { name }
    );
    console.log("\nDepartment added successfully!\n");
  } catch (error) {
    console.log("Error adding department:", error);
  }
}

async function addRole() {
  const [departments] = await db.findAllDepartments();
  const departmentChoices = departments.map(department => ({
    name: department.name,
    value: department.id
  }));

  const { role_name, department_id } = await prompt([
    {
      type: "input",
      name: "role_name",
      message: "Enter the name of the role:"
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department for this role:",
      choices: departmentChoices
    }
  ]);

  try {
    await db.connection.promise().query(
      "INSERT INTO role SET ?",
      {
        role_name,
        department_id
      }
    );
    console.log("\nRole added successfully!\n");
  } catch (error) {
    console.log("Error adding role:", error);
  }
}

async function addEmployee() {
  const [roles] = await db.findAllRoles();
  const roleChoices = roles.map(role => ({
    name: role.role_name,
    value: role.id
  }));

  const { first_name, last_name, role_id, manager_id } = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:"
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:"
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role for this employee:",
      choices: roleChoices
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager's employee id (if applicable):"
    }
  ]);

  try {
    await db.connection.promise().query(
      "INSERT INTO employee SET ?",
      {
        first_name,
        last_name,
        role_id,
        manager_id: manager_id || null
      }
    );
    console.log("\nEmployee added successfully!\n");
  } catch (error) {
    console.log("Error adding employee:", error);
  }
}

async function updateEmployeeRole() {
  const [employees] = await db.findAllEmployees();
  const employeeChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));

  const [roles] = await db.findAllRoles();
  const roleChoices = roles.map(role => ({
    name: role.role_name,
    value: role.id
  }));

  const { employee_id, role_id } = await prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select the employee to update:",
      choices: employeeChoices
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the new role for the employee:",
      choices: roleChoices
    }
  ]);

  try {
    await db.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [role_id, employee_id]
    );
    console.log("\nEmployee role updated successfully!\n");
  } catch (error) {
    console.log("Error updating employee role:", error);
  }
}

loadMainPrompts();
