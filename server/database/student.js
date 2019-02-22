const Sequelize = require("sequelize");
const db = require("./db");

const Student = db.define("student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Student;
