import mongoose from 'mongoose'

const departmentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    hospital: {
        type: Array,
        ref: 'Hospital' 
    },
    appointments:{
        type:Number,
        default:0    
    },
    history:{
        type:Number,
        default:0    
    },
    isBlock:{
        type:Boolean,
        default:false
      },
    
},{
    timestamps: true
})


const Department=mongoose.model('Department',departmentSchema)

export default Department