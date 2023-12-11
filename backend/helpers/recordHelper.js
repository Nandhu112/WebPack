import Record from "../models/recode.js"
import Patient from "../models/patientModel.js";


const addRecord = async (record, category, _id, res) => {
    console.log(record, category, _id, 'check record');

    try {
        const patient = await Patient.findById({ _id });

        if (!Patient) {
            return res.status(404).json({ error: "Patient not found" });
        } else {
            if (category === "allergies") { // Corrected the comparison operator here
                console.log('check record if');
                patient.allergies.push(record);
            } else {
                patient.ailments.push(record);
            }
            await patient.save(); // Save the updated record
        }
        return res.status(200).json({ success: "Records updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const findRecord = async (category, _id, res) => {
    console.log('test hpr')
    category = "ailments"
    try {
        const patient = await Patient.findById({ _id: "6572db846902664eb3c056ef" });
        if (patient) {
            console.log('test hpr if')
            if (category === "allergies") { // Corrected the comparison operator here
                return patient.allergies
            } else {
                return patient.ailments
            }
        }
        else {
            return res.status(404).json({ error: "Patient not found" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


const deletePatientRecord = async (record, category, _id, res) => {
    console.log(record, category, _id, 'check record');

    try {
        const patient = await Patient.findById({ _id });

        if (!Patient) {
            return res.status(404).json({ error: "Patient not found" });
        } else {
            if (category === "allergies") { // Corrected the comparison operator here
                console.log('check record if');
                patient.allergies.pull(record);
            } else {
                patient.ailments.pull(record);
            }
            await patient.save(); // Save the updated record
        }
        return res.status(200).json({ success: "Records updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export {
    addRecord,
    findRecord,
    deletePatientRecord
}