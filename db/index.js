const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query(
      "select * from employee"
    );
  }
  findAllRoles() {
    return this.connection.promise().query(
      "select * from role"
    )
  }
  findAllDepartments() {
    return this.connection.promise().query(
      "select * from department"
    )
  }
}
module.exports = new DB(connection);
