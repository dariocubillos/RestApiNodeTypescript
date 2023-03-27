import { Schema, model } from 'mongoose';

const SearchesSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    productUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

export default model('Searches', SearchesSchema)