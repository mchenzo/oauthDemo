const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String
});

//create a new collection, name of collection = users, schema
mongoose.model('users', userSchema);