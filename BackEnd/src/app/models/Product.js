const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Product = new Schema({
    name: { 
      type: String, 
      default: '', 
      maxLength: 255, 
      required: true
    },
    img: { 
      type: Array, 
      // required: true
    },
    BaPrice: { 
      type: Number,
      default: '',
    },
    PrPrice: { 
      type: Number,
      default: '',
    },
    type: { 
      type: Object,
      ref: "TypeProduct",
    },
    brand: { 
      type: String, 
      default: '', 
      maxLength: 255, 
      required: true 
    },
    material: { 
      type: String, 
      default: '',
    },
    style: {
      type: String,
      default: '',
    },
    quantity: {
        type: Number,
        default: '',
    },
    description: {
      type: String,
      default: '',
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

module.exports =  mongoose.model('Product', Product)