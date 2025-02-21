const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = conectarDB;
