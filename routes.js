const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  return res.redirect("/instructos")
})
routes.get('/instructos', (req, res) => {
  return res.render('instructos/index')
})
routes.get('/members', (req, res) => {
  return res.send('members')
})

module.exports = routes