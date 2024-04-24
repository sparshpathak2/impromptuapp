import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const SpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
});


const Space = models.Space || model('Space', SpaceSchema);

export default Space;