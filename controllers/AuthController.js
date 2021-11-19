const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { ObjectID } = require('mongodb')

let token = null;
const register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: `An error occured! ${error}`
            })
        })
    })
}

const login = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;    
    User.findOne({$or: [{email: username}, {phone: username}]})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    token = jwt.sign({name: user.name}, 'adi200012', {expiresIn: '5h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                } else {
                    res.json({
                        message: 'Password does not match in our database!'
                    })
                }
            })
        } else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

const logout = (req, res) => {
    console.log(token)
//     req.token.deletetoken(req.token, (err, user) => {
//         if(err) {
//             return res.status(400).send(err);
//         } else { 
//             res.sendStatus(200);
//             res.json({
//                 message: "Logout successful!"
//             })
//         }
//     })
}

module.exports = {
    register,
    login,
    logout
}