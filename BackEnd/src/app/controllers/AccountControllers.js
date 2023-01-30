const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret = '53055689bd6356066738d0d4788987df94304bbe137980662a6bd097887097a51beebf'

class AccountControllers {
    registerAccount = async (req, res, next) => {
      const { username,phone,address,password } = req.body;
      if (password.length < 4) {
        return res.status(400).json({ message: "Password less than 4 characters" })
      }
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          phone,
          address,
          password: hash,
        })
          .then((user) => {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(201).json({
              message: "User successfully created",
              user: user._id,
            });
          })
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    };
    
    loginAccount  = async (req, res, next) => {
      const phone = req.body.phone
      const password = req.body.password
      if (!phone || !password) {
        return res.status(400).json({
          message: "Username or Password not present",
        })
      }
      try {
        const user = await User.findOne({ phone })
        if (!user) {
          res.json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, phone, role: user.role },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            return res.status(200).send({
              _id: user._id,
              accessToken: token,
              username: user.username,
              address: user.address,
              phone: user.phone,
              role: user.role,
            });
          } else {
            res.json({ message: "Login not succesful" });
          }
        });
      }
      } catch (error) {
        res.json({
          message: "An error occurred",
          error: error.message,
        })
      }
    };
}


module.exports = new AccountControllers()
