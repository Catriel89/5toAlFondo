'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * discount Schema
 */
var nextDiscountSchema = new Schema({
  categoria:{
    type: String
  },
  montoActual:{
    type: Number
  },
  montoFaltante:{
    type: Number
  },
  percentage:{
      type: String,
      default: '5%'
  },
  mes: {
    type: Number
  },
  anio: {
    type: Number
  }
});

mongoose.model('NextDiscount', nextDiscountSchema);

'use strict';