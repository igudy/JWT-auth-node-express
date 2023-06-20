// Check username, password in post (login) request
// If exist create new JWT
// Send back to front-end
// Setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

const login = async (req, res) => {
  const { username, password } = req.body

  // Mongoose Validation PR
  // JOI (Express Package)
  // Check in the Controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400)
  }

  // just for demo, normally provided by DB!!!
  const id = new Date().getDate()

  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })

  res.status(200).json({ msg: "User created", token })
}

const dashboard = async (req, res) => {
  // console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}
module.exports = {
  login,
  dashboard,
}
