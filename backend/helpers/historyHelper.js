import History from "../models/history.js";
import Appointment from "../models/appointmentModel.js";

const addRecord = async (doctor, patient, testResults, medicationList, treatments, description, appointmentId, res) => {
    try {
        const historyEntry = await History.create({
            patient: patient._id,
            pName: patient.name,
            pImage: patient.profileImage,
            pGender: patient.gender,
            pAge: patient.dateOfBirth,
            Blood: patient.bloodGroup,
            ailments: patient.ailments,
            allergies: patient.allergies,
            doctor: doctor._id,
            dName: doctor.name,
            dImage: doctor.profileImage,
            dTitle: doctor.title,
            department: doctor.department,
            depatrmentId: doctor.departmentId,
            hospital: doctor.hospital,
            hospitalId: doctor.hospitalId,
            testResults: testResults,
            medicationList: medicationList,
            treatments: treatments,
            description: description,
            appointmentId: appointmentId
        });

        if (historyEntry) {
            const appointment = await Appointment.findById(appointmentId)
            appointment.status = "Completed"
            await appointment.save();
        }

        return { success: "Records added successfully" };
    } catch (error) {
        // Handle error
        console.error(error);
        return { error: "Failed to add records" };
    }
};

const getAppointmentStatus = async (appointmentId, res) => {
    try {
        const history = await History.find({ appointmentId: appointmentId });
        if (history) {
            return history;
        }
        else {
            return {}
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const patientGetHistory = async (patientId, res) => {
    try {
        const history = await History.find({ patient: patientId });
        if (history) {
            return history;
        }
        else {
            return {}
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
const patientGetHistoryByAppointment = async (appointmentId, res) => {
    try {
        const history = await History.find({ appointmentId: appointmentId });
        if (history) {
            return history;
        }
        else {
            return {}
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export {
    addRecord,
    getAppointmentStatus,
    patientGetHistory,
    patientGetHistoryByAppointment
}