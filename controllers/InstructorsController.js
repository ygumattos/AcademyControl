const fs = require('fs')
const data = require('../data.json')

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
  }
}