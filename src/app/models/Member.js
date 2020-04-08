const { age, date } = require('../../lib/date')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query('SELECT * FROM members', (err, results) => {
      if (err) throw `Database Error!! ${err}`
      callback(results.rows)
    })
  },
  create(data, callback) {
    const { name,
      avatar_url,
      gender,
      email,
      birth,
      blood,
      weight,
      height,
      cep,
      street,
      neighborhood,
      city,
      state } = data

    const query = ` 
    INSERT INTO members ( 
      avatar_url,
      name,
      gender,
      email,
      birth,
      blood,
      weight,
      height,
      cep,
      street,
      neighborhood,
      city,
      state
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id
  `

    const values = [
      avatar_url,
      name,
      gender,
      email,
      date(birth).iso,
      blood,
      weight,
      height,
      cep,
      street,
      neighborhood,
      city,
      state
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error!! ${err}`

      callback(results.rows[0])

    })


  },
  find(id, callback) {
    db.query(`SELECT * FROM members WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database Error!! ${err}`
      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE members SET 
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      email=($5),
      blood=($6),
      weight=($7),
      height=($8),
      cep=($9),
      street=($10),
      neighborhood=($11),
      city=($12),
      state=($13)
      WHERE id = $14
    `

    const {
      avatar_url,
      name,
      birth,
      gender,
      email,
      blood,
      weight,
      height,
      cep,
      street,
      neighborhood,
      city,
      state,
      id } = data

    const values = [
      avatar_url,
      name,
      date(birth).iso,
      gender,
      email,
      blood,
      weight,
      height,
      cep,
      street,
      neighborhood,
      city,
      state,
      id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error!! ${err}`
      return callback()
    })

  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database Error!! ${err}`
      return callback()
    })

  }
}