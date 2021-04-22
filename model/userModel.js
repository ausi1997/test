const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({ // defining the user data model
    firstName:{
        type:String,
        required:true,
        min:[2, 'Name should be more than 2 characters'],
        max:[32, 'Name should be less than 32 characters']
    },
    lastName:{
        type:String,
        required:true,
        min:[2, 'Name should be more than 2 characters'],
        max:[32, 'Name should be less than 32 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true,   // email should be unique for everyone
        index:true,    // it can be queried by email
        lowercase:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    followers:[{
    type:ObjectId,
    ref:'user'
    }],
    followings:[{
        type:ObjectId,
        ref:'user'
    }],
    profilePic:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEXr6+urq6u9vb3o6Oi2trbl5eWxsbHBwcHc3NyysrLExMTPz8/h4eG6urrIyMjMzMzW1tYN9M62AAAEzElEQVR4nO2dCbaqMBBEDWESwrD/1X7A5xcQhSQF1fHkrsA6nR7TxNstEolEIpFIJBKJRCKRSCRYdDaiNft3OGL0TZu+LZo0Taqu7ksTpBZT9GWRqgdNUlTtICULT0id54l6595Uox72rztMtiXiRd50ZRC2Mc1XHRNp0Rn279xDH9AxUQi3S3dQx2iXmv1jv5Dlx4UMAa1n/94PZKa20TFQCQxium6szPEgLdm/e0XWpfu/eotc1vHqHYzxRJASXbjLGBATvbLa8VhJs4kuPQ7WSC4kzxtPHUNCkZHlK18dSrVsDSOlvw6lJBwuv5D1h4DDpe8IIQJisIHoUCndJD1GCN8kxjMbPrnTTQISoth1sF0v9YWCLATlI/Rc0sKEkNP79zGWDQ1XCMrXFflswXxdkVMJKLFPJEwhkNr3j5yZE5FCqE4CFcJM7lAhzCkEVAgzbCGjFjW3I/OIqohCQJ0uXwiyROEKgQxRJAjBlfHkQh7XWCnVMYUgEwl1LI+Mv9z5AzBscYXgel3FveO12BHYgdqPIL2d2iEORQrMSajR9wZMieyhKSolpmQd3pe6T5KSapL6DsyIxEG27T7QDjybIKt4xSzkj67+HYR3tpANomLWv1ghxCIFe7SIRQqw9lXUzgqwUfOCWf5C8wjzYhc6aaReWeH6KnL5q4Em4d6044qUnNuz4yZ05FUnnLuzt1FgOZG9/4uKW2QXwc2DyNMgXADmL/+C5kHsaRDqZpd+sm6gpoRvEIy78xd/Rzy9ZIgWuQSDDLS5z3173absZPgfk3koEWKNP9wrFXpKX+Le9JLXS9e4ZxP6fv8K51mdhM955rhOhtgXPG+4Ogm7n3rDtVWUFXxH3DosGbXJAre4xb6U3sJpMiQtZo24eIk4V5+wr4KlfHC8wt5LZBrEoXIUU76vsM3uwgrfF7ZOIq48eWIrRFgF/8JWiFRf/x0hts4uVohtkSJhvLiJbR4RG7Vs212pecS+akxk1louQ+BWXmOVdU7NbiLtePWuQ9NUlBLtsSfUCFKy887kDnLSie+CPPUzsRmZ9+Ub/0p3xPPttodNBEThI++X7kO/tDI1aqumqYnTU9MidwEHLZRIrHvwRvlAntRXe4up8TIm0u7KI1aCv1NY0vTXmCXrsBvYG6TV6WbRJdbBP9L0Z3q+8zuyLuTFSWbRdXGNMV4k+ICsyw75wMNh8hbaDpuWouJBg8otZX16lNoBkVtMd1LisyTxemq+rC4MUnukrt5SCrHFi7yyT/lnVIQIUrt4rK/Me5bkyeEeTPdyZUwcrF5K4TJG7vtWyaCf5J3H3riiJGZwO4qvSpBfsZ3NtwEl8nGm8/m8IgV+MOB0PhVgoen49Ey7/58LXM7m4Tr8l0eC2PzgGvl42WVsmCREg2xecAdpkC2TsLtZR942pZDfc1/KOpdA34m9kvWtXVjFyYz1vzIE0IN8YDmRgD7cey3LL4ICDb4jyzW84OrFF0snCdbX1SoAB5oOJ+ZOgnttkcA8k0Cfzrma+UpOwNF3GbYCjr4/JGQ+Fgo4jSyFhDSXe2MuJOR8uBASyOB6m7mQU1dkzuYnhYRcai2EBDnTevKTQkIufqMQcRS/KCSYq9wtohBpRCHSqH5RSMjToD8h/wDz2VizBRL3XQAAAABJRU5ErkJggg=="
    },
    timestamps:{
        type:Date,
        default:Date.now()
    }
});

// creating user model
mongoose.model('user',userSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('user');