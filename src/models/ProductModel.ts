import { prop, Typegoose} from 'typegoose';

class ProductSchema extends Typegoose {

    @prop({required: true})
    public name!: string;

    @prop({required: true})
    public description!: string;

    @prop({required: true})
    public price!: number;

    @prop({required: true})
    public thumbailURI!: string;

}

export const ProductModel = new ProductSchema().getModelForClass(ProductSchema, {
    schemaOptions: { collection: 'products' },
});
export default ProductModel;
