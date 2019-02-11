import mongoose from 'mongoose';

export default class MongoDBConfig {
    public mongoUrl = 'mongodb://localhost/sauceAPI';

    public async init() {
        try {
            return await mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        } catch (err) {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
            process.exit();
        }
    }
}
