const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User').UserSchema;

const TaskSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  from: {
    type: String,
    required: false
  }
})

const Task = mongoose.model('tasks', TaskSchema)
module.exports = Task;