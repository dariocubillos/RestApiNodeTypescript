import { Schema, model } from 'mongoose';

const SearchesSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    productString: { type: String, required: true },
    frequency: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    updatedAt: { type: Date, default: Date.now }
})

export default model('Searches', SearchesSchema)