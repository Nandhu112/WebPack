import Verification from "../models/verificationModel.js";
import Hospital from "../models/hospitalModel.js";


const getVerification = async (res) => {
    let data=[]
    console.log('getVerification');         
    try {
      const verifiction = await Verification.find().populate('hospital').sort({ status: 1 });
   
      for(let i=0;i<verifiction.length;i++){
        console.log('getVerification11'); 
        let temp={
          _id:verifiction[i]._id,
          status:verifiction[i].status,
          Hospital_id:verifiction[i].hospital._id,
          name:verifiction[i].hospital.name,
          email:verifiction[i].hospital.email,
          address:verifiction[i].hospital.address,
          department:verifiction[i].hospital.department,
          doctor:verifiction[i].hospital.doctor,
          certificate:verifiction[i].certificate,  
          date:verifiction[i].createdAt,
        }
       
        data.push(temp)

      }
      console.log(data, 'doctors'); // This 'doctors' variable now holds the populated data
    //   console.log(verifiction,'verifiction')
      return data;
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const adminHospitalVerify = async (hospital_id, application_id, res) => {
    console.log('chkk hprr ',hospital_id, application_id)
    try {
      const hospital = await Hospital.findById(hospital_id);
      if (hospital) {
        hospital.adminVerification = true; // Assuming this is meant to be 'isBlocked'
        await hospital.save();
  
        const verification = await Verification.findById(application_id);
        if (verification) {
          verification.status = "verified"; // Assuming 'verified' is a string status
          await verification.save(); // Saving the verification instead of hospital
        }
      }
      return { success: "Hospital Verified successfully" }; // Corrected success message
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

export { 
    getVerification,
    adminHospitalVerify
 };   