//Tạo Model
const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const bcrypt = require('bcrypt-nodejs')
var mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const User = new Schema({
    username: { 
      type: String, 
      maxLength: 30, 
      mimLength: 1, 
    },
    phone: { 
      type: Number, 
      required: true,
      unique: true,
    },
    address: { 
      type: String, 
      required: true
    },
    password: { 
      type: String,
      minlength: 4,
      required: true
    },
    role: {
      type: String,
      default: "basic",
    },
    slug: { 
      type: String, 
      slug: 'name' 
    },
  },
  { 
    timestamps: true,
  }
)

mongoose.plugin(slug)

User.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('User', User)