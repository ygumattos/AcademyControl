const Instructor = require('../models/Instructor')
const { age, date } = require('../../lib/date')

module.exports = {
  Post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`/instructors/${instructor.id}`)
    })

  },

  Create(req, res) {
    return res.render('instructors/create')
  },

  Show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found !!")

      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(',')
      instructor.created_at = date(instructor.created_at).format

      return res.render('instructors/show', { instructor })
    })
  },

  Edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found !!")

      instructor.birth = date(instructor.birth).iso
      return res.render('instructors/edit', { instructor })
    })
  },

  Put(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    Instructor.update(req.body, () => {
      return res.redirect(`/instructors/${req.body.id}`)
    })
  },

  Delete(req, res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect(`/instructors`)
    })

  },

  async Index(req, res) {
    Instructor.all(function (instructors) {
      return res.render("instructors/index", { instructors })
    })
  }
}