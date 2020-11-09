
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/final_project_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Kết nối thành công !!!');
    } catch (error) {
        console.log('Kết nối thất bại !!!')
        next(error);
    }
}

module.exports = { connect };
