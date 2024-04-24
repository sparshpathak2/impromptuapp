import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const foldersSchema = new mongoose.Schema({
    folder: {
      type: String,
      required: true
    }
  });

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // folders: [{
    //     type: String,
    //     required: true
    //   }], // Array of spaces
    folders: [foldersSchema], 
});


const Workspace = models.Workspace || model('Workspace', WorkspaceSchema);

export default Workspace;