
const getUsers = (req, res) => {
  res.status(200).json({ message: 'Get Users.' })
}

module.exports = {
  getUsers
}