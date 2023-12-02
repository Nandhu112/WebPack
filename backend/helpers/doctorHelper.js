import Doctor from "../models/doctorModel.js"
import Hospital from "../models/hospitalModel.js"


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
    try {
      const doctor = await Doctor.findById(_id);
      if(!doctor){
        return { error: "Hospital not found" }
      }
      else{
        const department= await doctor.populate('department')
        const data={
          name:department.name,
          email:department.email,
          title:department.title,
          qualification:department.qualification,
          department:department.department.name,
          description:department.description,
          profileImage:department.profileImage
          // doctorInfo:doctor
        }
        return (data)
      }
  
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

const HospitalListAllDoctors = async (_id, res) => {
  console.log(_id,'chkk HospitalListAllDoctors ')
  try {
      let data = [];
      let out =[]
      const hospital = await Hospital.findById(_id);
      if(hospital){
        for (let doctorId of hospital.doctor) {
          let doctors = await Doctor.findById(doctorId).populate('department').populate('hospital');
         
          data.push(doctors);
      }
      for(let i=0;i<data.length;i++){

        let temp={
          _id:data[i]._id,
          name:data[i].name,
          email:data[i].email,
          appointment:data[i].appointments,
          history:data[i].history,
          hospital:data[i].hospital.name,
          title:data[i].title,
          qualification:data[i].qualification,
          department:data[i].department.name,
          description:data[i].description,
          image:data[i].profileImage,
        }

        out.push(temp)

      }
      return out;
      }
  
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





export { 
    addNewDoctor,
    getDoctorFullInfo,
    listDoctors,
    blockDoctor,
    unBlockDoctor,
    HospitalListAllDoctors,
    checkIsDoctorBlocked
  
 };   