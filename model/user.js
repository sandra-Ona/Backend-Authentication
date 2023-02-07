//email-string, unique, required, validate,
// password-string, required, min-lenght

const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
const userSchema= new mongoose.Schema ({


    email: {
        type: String,
        unique: [true, 'This email has been registered'],
        required:[ true, 'Please provide an email'],
        validate: [isEmail, 'Please enter a valid email']
    },

    password: {
        type: String,
       minLength: [10, 'The minimum password lenght is 10'],
       required:[true, 'Please provide a valid password']
    },

}, {timestamps: true}
);

//function that protect user informations before saving using mongos middleware or mongos hooks
//generate salt, hasg
userSchema.pre('save', async function (next) {
 const salt= await bcrypt.genSalt()
 this.password= await bcrypt.hash(this.password, salt)
 next()
})

module.exports = mongoose.model('User', userSchema);