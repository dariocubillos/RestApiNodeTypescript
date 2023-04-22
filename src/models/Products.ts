import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
    title: { type: String, required: true },
    idML: { type: String, required: true, unique: true},
    productSlug: { type: String, required: true },
    condition: { type: String, required: true },
    permalink: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

export default model('Products', productsSchema)