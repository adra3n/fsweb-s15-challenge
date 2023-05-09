const UsersModel = require('../users/model')
const bcrypt = require('bcryptjs')

async function checkUserName(req, res, next) {
  try {
    const { username } = req.body
    const isUsernameExists = await UsersModel.getByFilter({
      username: username,
    })
    if (!username) {
      res.status(400).json({ message: 'Kullanıcı adı girmeniz gereklidir.' })
    }
    if (isUsernameExists) {
      res.status(401).json({ message: 'username alınmış' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function checkPassword(req, res, next) {
  try {
    const { password, username } = req.body
    const user = await UsersModel.getByFilter({
      username: username,
    })
    if (!username || !password) {
      res.status(400).json({ message: 'username ve password gereklidir' })
    }
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı.' })
    } else {
      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        res.status(400).json({ message: 'geçersiz kriterler' })
      } else {
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkPassword,
  checkUserName,
}
