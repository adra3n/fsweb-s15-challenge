const db = require('../../data/dbConfig')

async function getAll() {
  return await db('users')
}

async function getByFilter(filter) {
  return await db('users').where(filter).first()
}

async function addUser(user) {
  const [addedUserId] = await db('users').insert(user)
  return await getByFilter({ id: addedUserId })
}

module.exports = {
  getAll,
  getByFilter,
  addUser,
}
