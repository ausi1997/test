const User = require('../model/usermodel'); // importing the user module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('../model/postModel');
const{check,validationResult}= require('express-validator');



// defaultroute function
exports.default = async(req,res)=>{
    try{
     await User.find()    // checking the default route
     return res.json({
         status:true,
         message:'default route is working...'
     });
    }
    catch(err){
     return res.json('Error' + err);
    }
}

// Registration function

 exports.register = async(req,res)=>{
    try{
        await User.findOne({email:req.body.email})  // checking if email is already exist
        .exec((newUser,existUser)=>{
            if(existUser){ // if exist
                return res.json({
                    message:'Email is already registered...'
                });
            }
            else{ // if not
                User.create({
                    firstName:req.body.firstName,   // then creating the user in database
                   lastName:req.body.lastName,
                   email:req.body.email,
                   username:req.body.username,
              //     profilePic:req.body.profilePic,
                   password:bcrypt.hashSync(req.body.password, 8) // hashing the password
                },(error,result)=>{
                    if(!error){ // if all ok
                        return res.json({
                            status:true,
                            message:'User Registered Successfully',
                            result
                        });
                    }
                    else{ // if error
                        return res.json({
                            status:false,
                            message:'Registration failed...',
                            error
                        });
                    }
                })
            }
        })
    }
    catch(err){
        return res.json('error' +err);
    }
}

//const valid = [check('password').not().isEmpty().trim().escape(),
//check('email').isEmail().normalizeEmail() ];
exports.signin = async(req,res)=>{
    try{
        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.json({
                status:false,
                message:'Validation error',
                error:error.array()
            });
        }
        else{
            // check email exists or not
            User.findOne({email:req.body.email}, (errors,result)=>{
                // check error
                if(errors){
                  return res.json({
                      status:true,
                      message:'email does not exist',
                      errors:errors
                  });
                }
                 // result is empty or not
                 if(result){
                    // when result ha ssome doc
                    // then match the password
                    const match = bcrypt.compareSync(req.body.password, result.password);
                    // check password is match or not
                    if(match){
                        // password matched
                        let token = jwt.sign({_id:result._id}, 'verySecretValue', {expiresIn: '24h'});
                        const {_id,firstName,lastName,email,username,profilePic,followers,followings} = result;
                        return res.json({
                            status:true,
                            message:'Password matched.... login success....',
                            result:result,
                            token:token,  // it give the token in result
                            user:{_id,firstName,lastName,email,username,profilePic,followers,followings}
                        });
                    }
                    else{
                        // password not matched
                        return res.json({
                            status:false,
                            message:'Password do not matched....   login failed...',
                        });
                    }
                }
                else{
                    // user doc doesnot exist
                    return res.json({
                        status:false,
                        message:'user not exist....'
                    });
                }
            });
        }
            
        }
    
    catch(err){
        return res.json('error'+err);
    }
}


// to see other user

exports.otherProfile = async(req,res)=>{
    try{
   await User.findOne({_id:req.params._id})
   .select("-password")
   .then(user=>{
    Post.find({postedBy:req.params._id})
    .populate("postedBy", "_id firstName")
    .exec((err,posts)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json({
                user:user,
                posts:posts
            });
        }
    })
   })
    }
    catch(err){
return res.send("error" +err);
    }
}

// function to follow users

exports.follow = (req,res)=>{
    
      User.findByIdAndUpdate(req.body.followId,{
         $push:{followers:req.user._id}
     },{new:true},(error,result)=>{
         if(error){
             return res.json(error)
         }
         else{
             User.findByIdAndUpdate(req.user._id,{
                 $push:{followings:req.body.followId}
             },{new:true}).select("-password").then(result=>{
                 res.json(result)
             }).catch(err=>{
                 return res.json(err)
             })
         }
     })
}

// function to unfollow
exports.unfollow = (req,res)=>{
    
    User.findByIdAndUpdate(req.body.followId,{
       $pull:{followers:req.user._id}
   },{new:true},(error,result)=>{
       if(error){
           return res.json(error)
       }
       else{
           User.findByIdAndUpdate(req.user._id,{
               $pull:{followings:req.body.followId}
           },{new:true}).select("-password").then(result=>{
               res.json(result)
           }).catch(err=>{
               return res.json(err)
           })
       }
   })
}

// function to update your profile pic

exports.updatePic = (req,res)=>{
    User.findByIdAndUpdate({_id:req.user._id},{
        $set:{profilePic:req.body.profilePic}
    },{new:true},(error,result)=>{
        if(error){
            return res.json(error);
        }
        else{
            return res.json(result);
        }
    })
}

// function to search users

exports.search = (req,res)=>{
    let usersearch = new RegExp("^" + req.body.query)
    User.find({username:{$regex:usersearch}})
    .select("_id username profilePic")
    .then(user=>{
        res.json(user)
    }).catch(err=>{
        console.log(err);
    })
}