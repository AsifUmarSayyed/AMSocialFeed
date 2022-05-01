const Joi= require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 6,
    max: 250,
   
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

const feedValidation=(data)=>{
const schema=Joi.object({ 
    photo:Joi.string().min(6).required(),
    caption:Joi.string().min(6).required(), 
    like:Joi.string(),
    comment:Joi.string(),  
    
})

    return schema.validate(data)
    
}


const userValidation=(data)=>{
    const schema=Joi.object({ 
           firstName:Joi.string().min(4).required(),
           lastName:Joi.string().min(4).required(),
           email:Joi.string().email().min(6).required(),
        //    password: Joi.string().min(6).numeric(1).required(),
          password: passwordComplexity(complexityOptions),

              
    })
    
        return schema.validate(data)
        
    }

    const loginValidation=(data)=>{
        const schema=Joi.object({ 
              
            email:Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
            
            
        })
        
            return schema.validate(data)
            
        }
module.exports.loginValidation=loginValidation;
module.exports.feedValidation=feedValidation;
module.exports.userValidation=userValidation;

