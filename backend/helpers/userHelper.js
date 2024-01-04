import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Hospital from "../models/hospitalModel.js";

const listUsers = async (status,res) => {
    try {
        const status1 = status == "blocked"
        console.log(status1,'sta');
        const users = await User.find({ Admin: false, isBlock: status1 });
        console.log(users,'users')       
        return (users)
    } catch (error) {
        console.log(error,'error');
        res.status(500).json({ error: "Internal server error" });
    }
};

const blockUsers = async (_id, res) => {
    try {
        const user = await User.findById(_id);
        if (user) {
            user.isBlock = true; // Assuming this is meant to be 'isBlocked'
            await user.save();
        }
        return { success: "User Blocked successfully" }; // Returned object corrected
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const unBlockUnUsers = async (_id, res) => {
    try {
        const user = await User.findById(_id);
        if (user) {
            user.isBlock = false; // Assuming this is meant to be 'isBlocked'
            await user.save();
        }
        return { success: "User UnBlocked successfully" }; // Returned object corrected
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const findNearbyHospitals = async ( target,latitude,longitude,) => {
    console.log(target,'target........')
    if(target==='all'){
        const hospitals= await  userListAllHospital()
        console.log(hospitals,"hospitals.....")
        return hospitals;
    }
    console.log(target,longitude, latitude,'findNearbyHospitals');
    let hospitals=[]
    const hospital= await Hospital.find({isBlock:false,adminVerification:true})
    for(let i =0;i<hospital.length;i++){

    var distance = haversineDistance(latitude, longitude,hospital[i].latitude,hospital[i].longitude);
    console.log(distance)
    if(distance<target){
        hospitals.push(hospital[i])    
    }
    }
    console.log(hospitals)
    return hospitals;
  };


  function haversineDistance(lat1, lon1, lat2, lon2) {
    // Radius of the Earth in kilometers
    var R = 6371;

    // Convert latitude and longitude from degrees to radians
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    var distance = R * c;

    return distance;
}

const userListAllHospital = async (res) => {
    try {
      console.log('userListAllHospitals');
      const hospitals = await Hospital.find({isBlock:false,adminVerification:true});
      return (hospitals)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }    
  };

  const checkisUserBlocked = async (_id,res) => {
    try {
      console.log('userListAllHospitals');
      const user = await User.findById({_id});
      if(user){
        if(user.isBlock){
            return({Blocked:true})
        }
        else{
            return({Blocked:false})
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }    
  };





export {
    listUsers,
    blockUsers,
    unBlockUnUsers,
    findNearbyHospitals,
    checkisUserBlocked
};   