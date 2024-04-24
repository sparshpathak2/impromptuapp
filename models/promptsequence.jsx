import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  // promptNumber: {
  //   type: Number,
  //   required: true
  // },
  prompt: {
    type: String,
    required: true
  }
});


const PromptSequenceSchema = new mongoose.Schema({
  promptSequenceTitle: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
  }],
  // tagCategories: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'TagCategory'
  // }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  // space: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Space',
  //   required: true,
  // },
  prompts: [promptSchema], // Array of prompts
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});


const PromptSequence = models.PromptSequence || model('PromptSequence', PromptSequenceSchema);

export default PromptSequence;