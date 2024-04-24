import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({                           
  tag: {
    type: String,
    required: true
  }
});

const TagCategorySchema = new mongoose.Schema({
  tagCategory: {
    type: String,
    required: true
  },
  tags: [TagSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const TagCategory = models.TagCategory || model('TagCategory', TagCategorySchema);

export default TagCategory;