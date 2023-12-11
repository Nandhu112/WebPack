import Doctor from "../models/doctorModel.js"
import Hospital from "../models/hospitalModel.js"
import Appointment from "../models/appointmentModel.js";
// import verification from "../../frontend/src/Screens/Admin/vee.jsx";


const addNewDoctor = async (name, email, hospitalId, department, password,title,qualification,description, res) => {
    console.log(name, email, hospitalId, department, password, 'chkk hpr addNewDoctor at doc hpr');
    try {
      const doctorExists = await Doctor.findOne({ email });
      if (doctorExists) {
        return { error: "Doctor already exists" };
      } else {
        console.log('2222');
        const doctor = await Doctor.create({
          name,
          email,
          hospital: hospitalId,
          department,
          title,
          qualification,
          description,
          password,
        });
        console.log('11');
        const hospital = await Hospital.findById(hospitalId);
        console.log('33',hospitalId);
        if (hospital) {
          console.log('44');
          hospital.doctor.push(doctor._id);
          await hospital.save();
          return { success: "Doctor added successfully" };
        } else {
          return { error: "Hospital not found" };
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };   

  const getDoctorFullInfo = async (_id, res) => {
    console.log('chkk info')
    try {
      const doctor = await Doctor.findById(_id).populate('department').populate('hospital')
        const data={
          _id:doctor._id,
          name:doctor.name,
          email:doctor.email,
          title:doctor.title,
          qualification:doctor.qualification,
          department:doctor.department.name,
          departmentId:doctor.department._id,
          hospital:doctor.hospital.name,
          hospitalId:doctor.hospital._id,
          description:doctor.description,
          profileImage:doctor.profileImage,
          verification:doctor.verification,
          // doctorInfo:doctor
        }
        console.log(data,"dataa....")
        return (data)
      
  
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const listDoctors = async (status,res) => {
    let data=[]
    const status1 = status == "blocked"
    console.log(status1,'staaaaa ');
    console.log('listDoctors');         
    try {
      const doctors = await Doctor.find({isBlock: status1}).populate('department').populate('hospital');
   
      for(let i=0;i<doctors.length;i++){
      
        let temp={
          _id:doctors[i]._id,
          name:doctors[i].name,
          appointment:doctors[i].appointments,
          history:doctors[i].history,
          hospital:doctors[i].hospital.name,
          department:doctors[i].department.name
        }
        // console.log(temp,'temp')
        data.push(temp)

      }
      // console.log(data, 'doctors'); // This 'doctors' variable now holds the populated data
      return data;
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const blockDoctor = async (_id, res) => {
    try {
        const doctor = await Doctor.findById(_id);
        if (doctor) {
          doctor.isBlock = true; // Assuming this is meant to be 'isBlocked'
            await doctor.save();
        }
        return { success: "doctor Blocked successfully" }; // Returned object corrected
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const unBlockDoctor = async (_id, res) => {
    try {
        const doctor = await Doctor.findById(_id);
        if (doctor) {
          doctor.isBlock = false; // Assuming this is meant to be 'isBlocked'
            await doctor.save();
        }
        return { success: "doctor UnBlocked successfully" }; // Returned object corrected
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const HospitalListAllDoctors = async (_id,department, res) => {
  console.log(department,'chkk HospitalListAllDoctors ')
  try {
      let data = [];
      let out =[]
      let doctors
      if(department=="all"){
        doctors = await Doctor.find({hospital:_id}).populate('department').populate('hospital');
      }
      else{
        doctors = await Doctor.find({hospital:_id,department:department}).populate('department').populate('hospital');
      }
    
      console.log(doctors, "chkkk doccccccccccc")
      for(let i=0;i<doctors.length;i++){
        let temp={
          _id:doctors[i]._id,
          name:doctors[i].name,
          email:doctors[i].email,         
          appointment:doctors[i].appointments,
          history:doctors[i].history,
          hospital:doctors[i].hospital.name,
          hospitalId:doctors[i].hospital._id,
          title:doctors[i].title,
          qualification:doctors[i].qualification,
          department:doctors[i].department.name,
          departmentId:doctors[i].department._id,
          description:doctors[i].description,
          image:doctors[i].profileImage,
        }

        out.push(temp)
      }
      return out;

  } catch (error) {
      console.error("Error in listMembers:", error);
      return [];
  }
}

const checkIsDoctorBlocked = async (_id,res) => {
  try {
    const doctor = await Doctor.findById({_id});
    if(doctor){
   
      if(doctor.isBlock){
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

const lListAllDoctorAppointments = async (_id,status,res) => {
  let data=[]
  console.log('staaaaa ');
  let appointments  
  try {
    if(status==="all"){
    appointments = await Appointment.find({doctor:_id}).populate('patient').sort({ date: 1, time: 1 });
    }
    else{
      appointments = await Appointment.find({doctor:_id,status:status}).populate('patient').sort({ date: 1, time: 1 });
    }
    console.log(appointments,"appointments")
    for(let appointment of appointments ){   
      let temp={
        _id:appointment._id,
        patientId:appointment.patient._id,
        name:appointment.patient.name,
        age:appointment.patient.dateOfBirth,
        gender:appointment.patient.gender,
        blood:appointment.patient.bloodGroup,
        date:appointment.date,
        time:appointment.time,
        method:appointment.method,
        status:appointment.status
      }
      // console.log(temp,'temp')
      data.push(temp)

    }
    // console.log(data,"dataaa")

    return data;
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



export { 
    addNewDoctor,
    getDoctorFullInfo,
    listDoctors,
    blockDoctor,
    unBlockDoctor,
    HospitalListAllDoctors,
    checkIsDoctorBlocked,
    lListAllDoctorAppointments
  
 };   