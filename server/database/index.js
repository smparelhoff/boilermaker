const db = require('./db')
const Student = require('./student')
const Campus = require('./campus')
const User = require('./user')

//Associations
Student.belongsTo(Campus)
Campus.hasMany(Student)

module.exports = {
    db,
    Student,
    Campus,
    User
}