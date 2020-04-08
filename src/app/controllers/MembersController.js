const Member = require('../models/Member')
const { age, date } = require('../../lib/date')

module.exports = {
  Post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    Member.create(req.body, function (member) {
      return res.redirect(`/members/${member.id}`)
    })

  },

  Create(req, res) {
    return res.render('members/create')
  },

  Show(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found !!")

      member.birth = date(member.birth).birthDay

      return res.render('members/show', { member })
    })
  },

  Edit(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found !!")

      member.birth = date(member.birth).iso
      return res.render('members/edit', { member })
    })
  },

  Put(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`)
    })
  },

  Delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`)
    })

  },

  async Index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members })
    })
  }
}