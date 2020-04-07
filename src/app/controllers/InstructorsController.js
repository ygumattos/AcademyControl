const { age, date } = require('../../lib/date')

module.exports = {
  Post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "")
        return res.send('Please, fill all fields !')
    }

    const { avatar_url, name, services, gender } = req.body

    return;
  },

  Create(req, res) {
    return res.render('instructors/create')
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
    return res.render("instructors/index")
  }
}