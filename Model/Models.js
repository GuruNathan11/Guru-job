// var mongoose = require('mongoose');
// var { Schema } = mongoose;

// var Schema = new Schema({
//     userName:{
//         required : true,
//         type     : String
//     },
//     email:{
//         required : true,
//         type : String
//     },
//     mobile:{
//         required : true,
//         type     : String
//     },
//     experience:{
//         required : true,
//         type     : String
//     },
//     ctc:{
//         required : true,
//         type     : String
//     }
   
// },{versionKey:false});

// Schema.path('email').validate(async (email) => {
//     const nameCount = await mongoose.models.user.countDocuments({ email })
//     return !nameCount
// },'Name already Exists');


// var users = module.exports = mongoose.model('user',Schema);
// module.exports.get = function(callback,limit){
//     users.find(callback).limit(limit);
// }

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  mobile: {
    required: true,
    type: String
  },
  experience: {
    required: true,
    type: String
  },
  ctc: {
    required: true,
    type: String
  },
  file: {
    required: true,
    type: String
  }
}, { versionKey: false });

// userSchema.path('email').validate(async (email) => {
//   const emailCount = await mongoose.models.user.countDocuments({ email });
//   return emailCount === 0;
// }, 'Email already exists');

const User = mongoose.model('User', userSchema);

module.exports = User;
