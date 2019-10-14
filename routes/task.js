const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/add', (req, res) => {
  const task = new Task({
    title: req.body.data.title,
    user: req.body.data.user.email,
    completed: false
  })
  task.save()
    .then(task => res.send(task))
})

router.post('/share', (req, res) => {
    const task = new Task({
      title: req.body.data.title,
      user: req.body.data.to,
      from: req.body.data.from,
      completed: false
    })
    task.save()       
    .then(task => res.send(task))
})

router.post('/all', (req, res) => {
  Task.find({user: req.body.data.email})
    .then(tasks => res.send(tasks))
})

router.delete('/delete', (req, res) => {
  Task.findOneAndDelete({_id: req.body.id})
    .then(del => res.send(del))
})

router.put('/check', (req, res) => {
  const value = !req.body.data.task.completed;
  Task.updateOne({_id: req.body.data.task._id}, {completed: value})
    .then(task => res.send(task))
})

router.put('/edit', (req, res) => {
  Task.updateOne({_id: req.body.data.id}, {title: req.body.data.title})
    .then(task => res.send(task))
})

module.exports = router;