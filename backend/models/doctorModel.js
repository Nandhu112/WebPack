import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const doctorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Hospital' 
     
    },
    title:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Department' 
      
    },
    password:{
        type:String,
        required:true,
       
    },
    appointments:{
        type:Array,
   
    },
    history:{
        type:Array,
     
    },
    verification:{
        type:Boolean,
        default:false  
    },
    token:{
        type:String,
        default:null
       
    },
    profileImage: {
        type: String,
        default: "default.png",
      },
      isBlock:{
        type:Boolean,
        default:false
      },

},{
    timestamps: true
})

doctorSchema.pre('save',async function (next){
   if(!this.isModified('password')){
    
    next()
   }

   const salt=await bcrypt.genSalt(10)
   this.password= await bcrypt.hash(this.password,salt)
})   

doctorSchema.methods.matchPassword=async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
}

const Doctor=mongoose.model('Doctor',doctorSchema)

export default Doctor