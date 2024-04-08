const { Mongoose } = require("mongoose");
const appUserModel = require("../model/appUser_model");
class userServices {
     async createUser(insertObj) {
       console.log(insertObj,'inserOBJ')
    try {
         const user = new appUserModel(insertObj);
         console.log(user,'gggggg')
      await user.save();

      return {
        success: true,
        id: user._id,
        message: "User created!",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "User not created!",
      };
    }
     }
     
     async findUser(email) {
          console.log( email,'email')
          const user = await appUserModel.findOne({ email:email });
          console.log(user,'this is our user')
          if (!user) {
               return 'user not found'
          }
          else {
               return user;
          }
     }

     async fetchById(id,email, done) {
          //const _id = Mongoose.Types.ObjectId(id)
          const user = await appUserModel.findOne({ id,email })
          if (user) {
               return done(null, user)
          }
          else {
               return done({message:'No user found'})
          }
     }
               
}

module.exports = new userServices();

