import { prop, pre, instanceMethod, Typegoose} from 'typegoose';
import bcrypt from 'bcryptjs';

@pre<UserScheme>('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    user.password = hash;
    next();
})
class UserScheme extends Typegoose {

    @prop({required: true, unique: true})
    public username!: string;

    @prop({required: true})
    public password!: string;

    @prop({default: 'customer'})
    public role?: string;

    @instanceMethod
    public async isValidPassword(password: string) {
        const user = this;
        const compare = await bcrypt.compare(password, user.password);
        return compare;
    }

}

export const UserModel = new UserScheme().getModelForClass(UserScheme, {
    schemaOptions: { collection: 'users' },
});
export default UserModel;
