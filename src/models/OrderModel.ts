import mongoose from 'mongoose';
import { prop, Typegoose} from 'typegoose';

class OrderSchema extends Typegoose {
    // TODO: Implement referential ObjectID instead of JSON string:
    // @prop({required: true, ref: 'User'})
    // public customer!: mongoose.Types.ObjectId;
    @prop({required: true})
    public customer!: string;

    // TODO: Implement referential ObjectID instead of JSON string:
    // @prop({required: true, ref: 'Product'})
    // public products!: mongoose.Types.ObjectId;
    @prop({required: true})
    public products!: string;

    @prop({default: 0})
    public status?: mongoose.Types.ObjectId;

    @prop({default: ''})
    public deliveryData?: string;

}

export const OrderModel = new OrderSchema().getModelForClass(OrderSchema, {
    schemaOptions: { collection: 'orders' },
});
export default OrderModel;
