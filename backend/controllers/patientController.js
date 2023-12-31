import { addNewMember, listMembers, getUserPatientInfo, updatePatientProfileImage } from "../helpers/patientHelper.js"
import asyncHandler from "express-async-handler"


const addNewPatient = asyncHandler(async (req, res) => {
  const { name, date, bloodGroup, gender, _id } = req.body;
  const result = await addNewMember(_id, name, date, bloodGroup, gender, res);
  res.json(result); // Send the result back to the client
});

const listAllPatients = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const result = await listMembers(_id, res);
  res.json(result); // Send the result back to the client
});
const getPatientInfo = asyncHandler(async (req, res) => {
  let token
  token = req.cookies.jwt

  const { _id } = req.query;
  const result = await getUserPatientInfo(_id, res);
  res.json(result); // Send the result back to the client
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const {
    profileImage,
    id
  } = req.body;
  const result = await updatePatientProfileImage(profileImage, id)
  res.json(result);
})


export {
  addNewPatient,
  listAllPatients,
  getPatientInfo,
  updateProfilePic
};