'use strict';

import mongoose from 'mongoose';

var PageViewSchema = new mongoose.Schema({
  viewsCount: Number,
  lastViewed: Date
});

export default mongoose.model('PageView', PageViewSchema);
