const mongooes = require('mongoose');

const formSchema = new mongooes.Schema({
    firstname:{type:String},
    LastName: {type:String},
    email: {type:String,
        unique:true},
    mobile: {type:String},
    address:{type:String},
    verify_email:{type:Boolean,default: false} 
});

module.exports = mongooes.model("form", formSchema);
