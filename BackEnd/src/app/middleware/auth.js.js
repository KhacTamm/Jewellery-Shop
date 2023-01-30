const jwt = require("jsonwebtoken")
const jwtSecret = '53055689bd6356066738d0d4788987df94304bbe137980662a6bd097887097a51beebf'
// password = $2a$10$US/B6e5GSOiCnX2KUYfwg.BiXMOtyiVUkw5GihPylu1G9EsNUe17S (admin)


exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "admin") {
          return res.json({ message: "Not authorized" })
        } else {
          next()
        }
      }
    })
  } else {
    return res
      .json({ message: "Not authorized, token not available" })
  }
}

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "Basic") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }