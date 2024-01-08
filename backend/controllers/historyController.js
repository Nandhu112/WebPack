import asyncHandler from "express-async-handler"
import { addRecord, getAppointmentStatus, patientGetHistory, patientGetHistoryByAppointment } from "../helpers/historyHelper.js"

const addNewRecordtoHistory = asyncHandler(async (req, res) => {
    const { doctor, patient, testResults, medicationList, treatments, description, appointmentId } = req.body;
    const result = await addRecord(doctor, patient, testResults, medicationList, treatments, description, appointmentId, res);
    res.json(result); // Send the result back to the client    
});

const doctorGetAppointmentStatus = asyncHandler(async (req, res) => {
    const { appointmentId } = req.query;
    const result = await getAppointmentStatus(appointmentId, res);
    res.json(result); // Send the result back to the client    
});

const getPatientHistory = asyncHandler(async (req, res) => {
    const { patientId } = req.query;

    const result = await patientGetHistory(patientId, res);
    res.json(result); // Send the result back to the client    
});

const getPatientHistoryByAppointment = asyncHandler(async (req, res) => {
    const { appointmentId } = req.query;

    const result = await patientGetHistoryByAppointment(appointmentId, res);
    res.json(result); // Send the result back to the client    
});

export {
    addNewRecordtoHistory,
    doctorGetAppointmentStatus,
    getPatientHistory,
    getPatientHistoryByAppointment
}