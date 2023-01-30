const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const TypeProduct = new Schema({
    MaL: { 
      type: String, 
      maxLength: 50, 
      required: true,
    },
    name: { 
      type: String, 
      maxLength: 50, 
      required: true,
    },
    products: [{ 
      type: Schema.Types.ObjectId,
      ref: "Product",
    }],
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

module.exports =  mongoose.model('TypeProduct', TypeProduct)