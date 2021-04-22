const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({ // defining the user data model
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:'user'
    }],
    comment:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:'user'
        }
    }],
    postedBy:{
        type:ObjectId,   // building the relation
        ref:'user'
    },
  //  timestamps:true
},{
    timestamps:true
});

// creating user model
mongoose.model('post',postSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('post');