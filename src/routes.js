const express = require('express')
const routes = express.Router()

const InstructorsController = require('./app/controllers/InstructorsController')
const MembersController = require('./app/controllers/MembersController')

routes.get('/', (req, res) => {
  return res.redirect("/instructors")
})

routes.get('/instructors', InstructorsController.Index);
routes.post('/instructors', InstructorsController.Post)
routes.put('/instructors', InstructorsController.Put)
routes.delete('/instructors', InstructorsController.Delete)
routes.get('/instructors/create', InstructorsController.Create)
routes.get('/instructors/:id', InstructorsController.Show)
routes.get('/instructors/:id/edit', InstructorsController.Edit)

routes.get('/members', MembersController.Index);
routes.post('/members', MembersController.Post)
routes.put('/members', MembersController.Put)
routes.delete('/members', MembersController.Delete)
routes.get('/members/create', MembersController.Create)
routes.get('/members/:id', MembersController.Show)
routes.get('/members/:id/edit', MembersController.Edit)

module.exports = routes