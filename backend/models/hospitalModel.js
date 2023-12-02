import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const hospitalSchema=mongoose.Schema({
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
    title:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type: Array,
        ref: 'Department' 
      
    },
    doctor:{
        type: Array,
        ref: 'Doctor' 
      
    },
    verification:{
        type:Boolean,
        default:false  
    },
    adminVerification:{
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
      isBlock:{
        type:Boolean,
        default:false
      },
      latitude:{
        type:String,

    },
    longitude:{
        type:String,
     
    },
},{
    timestamps: true  
})

hospitalSchema.pre('save',async function (next){
   if(!this.isModified('password')){
    
    next()
   }

   const salt=await bcrypt.genSalt(10)
   this.password= await bcrypt.hash(this.password,salt)
})   

hospitalSchema.methods.matchPassword=async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
}

const Hospital=mongoose.model('Hospital',hospitalSchema)

export default Hospital