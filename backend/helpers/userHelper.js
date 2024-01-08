import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Hospital from "../models/hospitalModel.js";
import Appointment from "../models/appointmentModel.js";
import History from "../models/history.js";
import Patient from "../models/patientModel.js";

const listUsers = async (status, res) => {
    console.log("chk user")
    // try {
    //     const status1 = status == "blocked"
    //     const users = await User.find({ Admin: false, isBlock: status1 });
    //     return (users)
    // } catch (error) {
    //     res.status(500).json({ error: "Internal server error" });
    // }

    try {
        console.log("chk dr.")
        const status1 = status == "blocked";
        const users = await User.find({ Admin: false, isBlock: status1 })
        const userDataPromises = users.map(async (user) => {
          const userId = user._id;
          const appointmentCount = await Appointment.countDocuments({ user: userId });
          const historyCount = appointmentCount
          const patientCount = await Patient.countDocuments({ user: userId }); 
     
    
          return {
            userDetails: user,
            appointmentCount,
            historyCount,
            patientCount
          };
        });
    
        const usersWithData = await Promise.all(userDataPromises);
    
        return usersWithData;
      } catch (error) {
        return { error: 'An error occurred while fetching departments data' };
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

const findNearbyHospitals = async (target, latitude, longitude,) => {
    if (target === 'all') {
        const hospitals = await userListAllHospital()
        return hospitals;
    }
    let hospitals = []
    const hospital = await Hospital.find({ isBlock: false, adminVerification: true })
    for (let i = 0; i < hospital.length; i++) {

        var distance = haversineDistance(latitude, longitude, hospital[i].latitude, hospital[i].longitude);
        if (distance < target) {
            hospitals.push(hospital[i])
        }
    }
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
        const hospitals = await Hospital.find({ isBlock: false, adminVerification: true });
        return (hospitals)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const checkisUserBlocked = async (_id, res) => {
    try {
        const user = await User.findById({ _id });
        if (user) {
            if (user.isBlock) {
                return ({ Blocked: true })
            }
            else {
                return ({ Blocked: false })
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