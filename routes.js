const express = require('express')
const routes = express.Router()

const InstructorsController = require('./controllers/InstructorsController')

routes.get('/', (req, res) => {
  return res.redirect("/instructors")
})

routes.get('/instructors', InstructorsController.Index);

routes.post('/instructors', InstructorsController.Post)

routes.put('/instructors', InstructorsController.Put)

routes.delete('/instructors', InstructorsController.Delete)

routes.get('/instructors/create', (req, res) => {
  return res.render('instructors/create')
})

routes.get('/instructors/:id', InstructorsController.Show)

routes.get('/instructors/:id/edit', InstructorsController.Edit)

routes.get('/members', (req, res) => {
  return res.send('members')
})

module.exports = routes