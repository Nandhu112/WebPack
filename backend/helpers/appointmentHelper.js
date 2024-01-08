import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js"
import Patient from "../models/patientModel.js";

const userMakeAppointment = async (Bslot, dId, pId, method, hospital, department, user, res) => {
  const doctorId = dId
  const slot = Bslot;
  const patientId = pId
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
      method,
      hospital,
      department,
      user
    });

    return { success: "Appointment added successfully" };
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const doctorBlockSlot = async (Bslot, dId, date, res) => {
  try {
    // Create the appointment
    const appointment = await Appointment.create({
      doctor: dId,
      date,
      doctorBlockSlot: true,
      doctorSlots: Bslot
    });
    return { success: "Appointment added successfully" };
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const userListDoctorAppointments = async (date, _id, res) => {
  const doctor = _id
  try {
    const appointments = await Appointment.find({ doctor: doctor })

    let data = []
    for (let appointment of appointments) {

      if (appointment.date == date) {
        if (!appointment.doctorBlockSlot) {
          data.push(appointment.time)
        }
        else {
          data.push(...appointment.doctorSlots)
        }
      }

    }
    return data;


  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  userMakeAppointment,
  userListDoctorAppointments,
  doctorBlockSlot
}
