const Joi = require("joi");
const userServices = require("../services/userServices");
const {generateJwt} = require('../helper/jwthelper')

class UserController {
     async signUp(request, response, next) {
          const schema = Joi.object({
               fullName: Joi.string().required().trim(),
               email: Joi.string().email().required().trim(),
               mobile: Joi.number().required(),
          });
          
          try {
             //  console.log(request.body)
               const validation = schema.validate(request.body);
      const newUser = await userServices.createUser(validation.value);
      response.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
     }
     
     async login(request, response, next) {
          const schema = Joi.object({
            fullName: Joi.string().required().trim(),
            email: Joi.string().email().required().trim(),
            mobile: Joi.number().required(),
          });
          try {
               const { fullName, email, mobile } = schema.validate(request.body).value;
                let objToken
               let user = await userServices.findUser(email)
               console.log(user,'trytry')
               if (user) {
                   objToken = await generateJwt({ _id:user._id,fullName, email, mobile },'app')
                    
               }  
                response.status(201).json({user, objToken}); 
          } catch (error) {
               return next(error)
          }
     }

     async getUserDetails(request, response, next) {
          try {
               const userId = request.user.email
               response.status(201).json({ userId}); 
          } catch (error) {
               return next(error)
          }
     }
          
}

module.exports = new UserController();
