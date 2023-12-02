import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";

const addNewMember = async (_id, name, dateOfBirth, bloodGroup, gender, res) => {

    try {
        const patient = await Patient.create({ name, dateOfBirth, bloodGroup, gender });
        
        // Find the user by ID
        const user = await User.findById(_id);
        
        // If user exists, update their patients array and save
        if (user) {
            user.members.push(patient._id);
            await user.save();
        } else {
            return res.status(404).json({ error: "User not found" });
        }

        // Return success message or the created patient
        return res.status(201).json({ message: "Member added successfully", patient });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const listMembers = async (_id, res) => {
    try {
        let data = [];
        const user = await User.findById(_id);
        
        for (let memberId of user.members) {
            let patient = await Patient.findById(memberId);     
            data.push(patient);
        }
        const data2=data.shift()
        console.log("listMembersssss:", data);
        return data;
    } catch (error) {

        console.error("Error in listMembers:", error);

        return [];
    }
}

const getUserPatientInfo = async (_id, res) => {
    try {
        const patient = await Patient.findById(_id);
        if(patient){
            return patient;
        }
        else{
            return res.status(404).json({ error: "Patient not found" }); 
        }
       
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export { 
    addNewMember,
    listMembers,
    getUserPatientInfo,
   };