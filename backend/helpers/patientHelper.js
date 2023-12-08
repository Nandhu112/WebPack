import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js"

const addNewMember = async (_id, name, dateOfBirth, bloodGroup, gender, res) => {

    try {
        const patient = await Patient.create({ name, dateOfBirth, bloodGroup, gender,user:_id });
        
        // Return success message or the created patient
        return res.status(201).json({ message: "Member added successfully", patient });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const listMembers = async (_id, res) => {
    console.log("listMembersssss:", _id);
    try {
        let data = [];
        const patients = await Patient.find({user:_id});
        console.log("listMembersssss:", patients);
        return patients;
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

const updatePatientProfileImage = async (profileImage,_id,res) => {

    console.log('profileImage1111')
    const result = await cloudinary.uploader.upload(profileImage, {
      folder: "PatientProfilepic",
    });
    console.log(result,'result111111111111')
    console.log(_id,'hhhhhhh')
    const patient = await Patient.findById(_id);     
    console.log(_id,'111')   
    if (patient) {
      console.log(_id,'222')
      patient.profileImage=result.secure_url;
      await patient.save();
      return { success: "ProfileImage update successfully" };
    } else {
      res.status(400);
      return res.status(404).json({ error: "Patient not found" }); 
    } 
  };

export { 
    addNewMember,
    listMembers,
    getUserPatientInfo,
    updatePatientProfileImage
   };