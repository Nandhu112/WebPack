import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js"
import Patient from "../models/patientModel.js";

const userMakeAppointment = async (Bslot,dId,pId,res) => {
    console.log("chk userMakeAppointment");
    const doctorId = dId
    const slot = Bslot;
    const patientId = "656865ba1f439cf9df266067"
    const date = Bslot[0];
    const time = Bslot[1];
    try {
      // Create the appointment
      const appointment = await Appointment.create({
        doctor: doctorId,
        slot,
        patient: patientId,
        date,
        time,
      });
  
      // Update doctor's appointments
      const doctor = await Doctor.findById(doctorId);
      doctor.appointments.push(appointment._id);
      await doctor.save();
  
      // Update patient's appointments
      const patient = await Patient.findById(patientId);
      patient.appointments.push(appointment._id);
      await patient.save();
  
      return { success: "Appointment added successfully",};
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };


  const userListDoctorAppointments = async (date,_id, res) => {
    console.log('userListDoctorAppointments')
    console.log(date,_id,'date')
    const doctor=_id
    try {
      const doctors = await Doctor.findById(doctor)
      console.log('44')
     if(!doctors){
        console.log('00')
        return { error: "Doctor not found" };
     } 
    else{
        console.log('11')
        let data=[]
      for(let appointment of doctors.appointments){
        console.log('22')
        console.log(appointment,'appointment ID')
        const appointments = await Appointment.findById( appointment )
        if(appointments.date==date){
            data.push(appointments.time)
        }
       
      }
      console.log(data,'data')
      return data;
    }
      
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });   
    }
  };

  export{
    userMakeAppointment,
    userListDoctorAppointments
  }
