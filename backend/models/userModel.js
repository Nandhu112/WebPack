import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
       
    },
    verification:{
        type:Boolean,
        default:false  
    },
    token:{
        type:String,
       
    },
    profileImage: {
        type: String,
        default: "default.png",
      },
    Admin:{
        type:Boolean,
        default:false
      },
      appointments:{
        type:Array,
          
    },
    history:{
        type:Array,
  
    },
    members:{
        type:Array,
        ref: 'Patients' 
  
    },
    isBlock:{
        type:Boolean,
        default:false
      },
},{
    timestamps: true
})

userSchema.pre('save',async function (next){
   if(!this.isModified('password')){
    
    next()
   }

   const salt=await bcrypt.genSalt(10)
   this.password= await bcrypt.hash(this.password,salt)
})   

userSchema.methods.matchPassword=async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model('User',userSchema)

export default User