import asyncHandler from "express-async-handler"
import { addRecord, findRecord, deletePatientRecord } from "../helpers/recordHelper.js"

const addNewRecord = asyncHandler(async (req, res) => {
    const { record, category, _id } = req.body;
    const result = await addRecord(record, category, _id, res);
    res.json(result); // Send the result back to the client
});

const findPatientRecord = asyncHandler(async (req, res) => {
    const { category, _id } = req.query;
    const result = await findRecord(category, _id, res);
    res.json(result);
});

const deleteRecord = asyncHandler(async (req, res) => {
    const { record, category, _id } = req.body;
    const result = await deletePatientRecord(record, category, _id, res);
    res.json(result); // Send the result back to the client
});

export {
    addNewRecord,
    findPatientRecord,
    deleteRecord,

}