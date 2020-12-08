
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/final_project_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Kết nối cơ sở dữ liệu thành công !!!');
    } catch (error) {
        console.log('Kết nối cơ sở dữ liệu thất bại !!!')
        next(error);
    }
}

module.exports = { connect };
