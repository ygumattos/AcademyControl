const { age, date } = require('../../lib/date')

module.exports = {
  Post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    return;
  },

  Create(req, res) {
    return res.render('members/create')
  },

  Show(req, res) {
    return

  },

  Edit(req, res) {
    return
  },

  Put(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }
    return
  },

  Delete(req, res) {
    return

  },

  Index(req, res) {
    return res.render("members/index")
  }
}