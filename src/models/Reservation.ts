import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
    slug: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    specialty: { type: Number, required: true },
    controlNumber: { type: String, required: true },
    telephone: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    productSlug: { type: String, required: true },
    state: { type: String, default: 'requested' }
})

export default model('Reservation', productsSchema)