const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContactInfoSchema = new Schema({
	profileID:{
		type:String
    },
    //won’t need name, just reference profileID > UserID > name
    address: {
        type: String,
        maxLength: 20
    },
    secondAddress: {
        type: String,
        maxLength: 20
    },
    city: {
        type: String,
        maxLength: 20
    },
    state: { //get from dropdown
        type:String
    },
    zipCode: {
        type: String,
        maxLength: 5,
        minLength: 5,
        pattern: "^[0-9]*$" //numbers only
    },
    email:{
        type: String,
        //pattern: //make it so that at least 1 “@” is required or use a email validation function
        maxLength: 20
    },
    homePhone:{
        type: String,
        maxLength: 20
    },
    cellPhone:{
        type: String,
        maxLength: 20
    }
})


module.exports = User = mongoose.model("ContactInfoSchema", ContactInfoSchema);
