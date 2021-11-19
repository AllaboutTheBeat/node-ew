const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// User.method.deleteToken = (token, cb) => {
//     let useractv = this;
//     useractv.update({$unset : {token :1}}, (err, user) => {
//         if(err) return cb(err);
//         cb(null, user)
//     })
// }

module.exports = mongoose.model("user", User)