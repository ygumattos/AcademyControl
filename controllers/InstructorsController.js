const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils/date.js')

module.exports = {
  Post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    const { avatar_url, name, services, gender } = req.body

    data.instructors.push({
      id: Number(data.instructors.length + 1),
      avatar_url,
      name,
      birth: Date.parse(req.body.birth),
      gender,
      services,
      created_at: Date.now(),
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send(error)
      return res.redirect("/instructors")
    })
  },

  Show(req, res) {
    // query = ?id
    // body = json { id }
    // params = instructos/:id
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructor) return res.send("Instructor not found !!")

    const instructor = {
      ...foundInstructor,
      gender: foundInstructor.gender == "M" ? "Masculino" : "Feminino",
      services: foundInstructor.services.split(","),
      age: age(foundInstructor.birth),
      created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor })

  },

  Edit(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructor) return res.send("Instructor not found !!")

    const instructor = {
      ...foundInstructor,
      birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", { instructor })
  },

  Put(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
      if (instructor.id == id) return index = foundIndex
    })

    if (!foundInstructor) return res.send("Instructor not found !!")

    const instructor = {
      ...foundInstructor,
      ...req.body,
      birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write error!");
    })

    return res.redirect(`/instructors/${id}`)
  },

  Delete(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(instructor => instructor.id != id)

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write error!")
    })

    return res.redirect('/instructors')

  }
}