import mongoose, { Schema, ObjectId, Document } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';
import User from './User';
import Product from './Product';

export interface IDenuncia {
    userId: string;
    date: Date; 
    productId: string;
    gravity: number;
    description: string;
}

export interface IDenunciaModel extends IDenuncia, Document {}

const DenunciaSchema: Schema = new Schema(
    {
        userId: { type: String, ref: 'User', required: true },
        date: { type: Date, required: true },
        productId: { type: String, ref: 'Product', required: true },
        gravity:{ type: Number, required: true },
        description: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

DenunciaSchema.plugin(mongoosePagination);
export default mongoose.model<IDenunciaModel, Pagination<IDenunciaModel>>('Denuncia', DenunciaSchema);
