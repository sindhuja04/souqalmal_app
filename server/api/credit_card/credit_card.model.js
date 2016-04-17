'use strict';

import mongoose from 'mongoose';

var CreditCardSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('CreditCard', CreditCardSchema);
