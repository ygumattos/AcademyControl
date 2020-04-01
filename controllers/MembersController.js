const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils/date.js')

module.exports = {

  Index(req, res) {
    return res.render("members/index", { members: data.members })
  },

  Show(req, res) {
    // query = ?id
    // body = json { id }
    // params = instructos/:id
    const { id } = req.params

    const foundMember = data.members.find(member => member.id == id)
    if (!foundMember) return res.send("Member not found !!")

    const member = {
      ...foundMember,
      gender: foundMember.gender == "M" ? "Masculino" : "Feminino",
      services: foundMember.services.split(","),
      age: age(foundMember.birth),
      created_at: new Intl.DateTimeFormat("en-GB").format(foundMember.created_at),
    }

    return res.render("members/show", { member })

  },

  Post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    const { avatar_url, name, services, gender } = req.body

    data.members.push({
      id: Number(data.members.length + 1),
      avatar_url,
      name,
      birth: Date.parse(req.body.birth),
      gender,
      services,
      created_at: Date.now(),
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send(error)
      return res.redirect("/members")
    })
  },

  Create(req, res) {
    return res.render('members/create')
  },

  Edit(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(member => member.id == id)
    if (!foundMember) return res.send("Member not found !!")

    const member = {
      ...foundMember,
      birth: date(foundMember.birth),
      id: Number(req.body.id)
    }

    return res.render("members/edit", { member })
  },

  Put(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find((member, foundIndex) => {
      if (member.id == id) return index = foundIndex
    })

    if (!foundMember) return res.send("Member not found !!")

    const member = {
      ...foundMember,
      ...req.body,
      birth: Date.parse(req.body.birth)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write error!");
    })

    return res.redirect(`/members/${id}`)
  },

  Delete(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(member => member.id != id)

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write error!")
    })

    return res.redirect('/members')

  }

}