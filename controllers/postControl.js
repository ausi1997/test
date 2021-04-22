const Post = require('../model/postModel');  // importing the post module
// default function

exports.defaultroute = (req,res)=>{
       Post.find()
       return res.json({
           status:true,
           message:'Route is working....'
       });
}
// creating a storage where post images will be stored

// function to create post

exports.createPost = (req,res)=>{
    const {title,body,pic} = req.body
    console.log(title,body,pic);
    if(!title || !body || !pic){    
        return res.json({
            status:false,
            message:'Please add the fields...'
        });
    }
    const post = new Post({  // creating a new post
        title,
        body,
        photo:pic,
        postedBy:req.user  // this will give that which user has posted this post
    });
    post.save().then(result=>{  // saving the data in database
        res.json({
            message:"posted successfully...",
            post:result
        });
    })
    .catch(err=>{
        res.json({
            err
        });
    })
}

// function to view all post

exports.viewpost = (req,res)=>{
    Post.find()
   .populate("postedBy", "_id firstName username")
   .populate("comment.postedBy","_id firstName username")
  .sort("-createdAt")
    .then(posts=>{
        return res.json(posts)
    })
    .catch(err=>{
        return res.json(err);
    })
}


// function to get the post of my fillowings

exports.followingpost = (req,res)=>{
    Post.find({postedBy:{$in:req.user.followings}})
   .populate("postedBy", "_id firstName")
   .populate("comment.postedBy","_id firstName")
    .then(posts=>{
        return res.json(posts)
    })
    .catch(err=>{
        return res.json(err);
    })
}

// function to view only my post

exports.mypost = (req,res)=>{
    Post.find({postedBy:req.user._id}) // quering the database by postby 
    .then(myposts=>{
           return res.json({myposts});
    })
    .catch(err=>{
        return res.json({err});
    })
}

// function for likes

exports.likes = (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {  // we will pass the id of post 
        $push:{likes:req.user._id} // using push to add the likes in the array
    }, {
        new:true  // so that we get the updated record
    }).exec((err,result)=>{
        if(err){        // executing the query
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })   
}

// function to unlike

exports.unlikes = (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}  // using pull to reduce the value from array
    }, {
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(result);
        }
    })   
}

// functions to add comments on post

exports.commentRoute = (req,res)=>{
    const comments = {   // so we will be sending the text from req
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {  //  passing the id of post
        $push:{comment:comments}  // using push to add the new comments in the array
        }, {
            new:true  // to update the record
        }).populate('comment.postedBy','_id firstName').populate('postedBy', '_id firstName').exec((err,result)=>{
            if(err){
                return res.json(err);
            }
            else{
                return res.json(result);
            }
        })
}

// function to delete the post

exports.deletePost = (req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate('postedBy', '_id')
    .exec((error,post)=>{
        if(error || !post){
            return res.json(error)
        }
        else if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            })
        }
    })
}
