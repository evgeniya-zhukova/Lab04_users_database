const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        minlength:4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        //index: true, //Optional if unique is defined
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        uppercase: true,
        //minlength:10,
        //maxlength: 50,
        //Custom validation
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        suite: {
            type: String,
            required: true,
            trim: true
        },
        city:{
            type: String,
            required: true,
            trim: true,
            //Custom validation
            validate: function(value) {
                var cityRegex = /^(?!\s*$)[-a-zA-Z ]*$/;
                return cityRegex.test(value);
            }
        },
        zipcode: {
            type: String,
            required: true,
            trim: true,
            //Custom validation
            validate: function(value) {
                var zipRegex = /\d{5}-\d{4}/;
                return zipRegex.test(value);
            }
        },
        geo: {
            lat: {
                type: Number,
                required: true,
                default: 0,
            },
            lng: {
                type: Number,
                required: true,
                default: 0,
            }},
        },
    phone: {
        type: String,
        required: true,
        trim: true,
        //Custom validation
        validate: function(value) {
            var phoneRegex = /\d-\d{3}-\d{3}-\d{4}/;
            return phoneRegex.test(value);
        }
    },
    website: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        //Custom validation
        validate: function(value) {
            var webRegex = /^https?:\/\//;
            return webRegex.test(value);
        }
    },
    company: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        catchPhrase:{
            type: String,
            required: true,
            trim: true
        },
        bs:{
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
});

/*
UserSchema.pre('save', true, (next) => {
  console.log("Before Save")
  //next();
});
*/
UserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
});

UserSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
});

UserSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
});

UserSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
