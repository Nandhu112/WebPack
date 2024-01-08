import Department from "../models/departmentModel.js";
import History from "../models/history.js";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Hospital from "../models/hospitalModel.js";
import Appointment from "../models/appointmentModel.js";
import mongoose from 'mongoose';


const adminGetdepartment = async (status, res) => {
  try {
    const results = await Department.aggregate([
      {
        $lookup: {
          from: 'histories',
          let: { departmentId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$depatrmentId', '$$departmentId'] }
              }
            },
            {
              $count: 'count'
            }
          ],
          as: 'departmentHistories'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$name',
          value: {
            $cond: {
              if: { $isArray: '$departmentHistories' },
              then: { $arrayElemAt: ['$departmentHistories.count', 0] },
              else: 0
            }
          }
        }
      },
      {
        $addFields: {
          value: { $ifNull: ['$value', 0] }
        }
      }
    ]);

    // Display results
    return results
    // Or handle results as needed
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminGetBoxs = async (status, res) => {
  try {
    const departments = await Department.find({ isBlock: false })
    const user = await User.find({ isBlock: false })
    const doctor = await Doctor.find({ isBlock: false })
    const hospital = await Hospital.find({ isBlock: false })
    const history = await History.find()

    let data = {
      user: user.length,
      departments: departments.length,
      doctor: doctor.length,
      hospital: hospital.length,
      history: history.length
    }
    return data;
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};


const hospitalHistoryCount = async (status, res) => {
  try {
    const hospitalsWithHistoryCount = await Hospital.aggregate([
      {
        $lookup: {
          from: 'histories',
          localField: '_id',
          foreignField: 'hospitalId',
          as: 'histories'
        }
      },
      {
        $project: {
          name: 1,
          historyCount: { $cond: { if: { $isArray: '$histories' }, then: { $size: '$histories' }, else: 0 } }
        }
      }
    ]);
    return hospitalsWithHistoryCount;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const hospitaldepartmentHistory = async (_id, res) => {

  let data = []
  try {
    const hospital = await Hospital.findById(_id).populate("department")
    for (let i = 0; i < hospital.department.length; i++) {
      const history = await History.find({ hospitalId: _id, depatrmentId: hospital.department[i]._id })
      if (history) {
        let temp = {
          id: hospital.department[i].name,
          value: history.length
        }

        data.push(temp)
      }
      else {
        let temp = {
          id: hospital.department[i].name,
          value: 0
        }

        data.push(temp)
      }
    }
    return data
  }
  catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const hospitalDoctorHistory = async (_id, res) => {
  let data = []
  try {
    const hospital = await Hospital.findById(_id).populate("doctor")
    for (let i = 0; i < hospital.doctor.length; i++) {
      const history = await History.find({ hospitalId: _id, doctor: hospital.doctor[i]._id })

      if (history) {
        let temp = {
          name: hospital.doctor[i].name,
          historyCount: history.length
        }

        data.push(temp)
      }
      else {
        let temp = {
          name: hospital.doctor[i].name,
          historyCount: 0
        }

        data.push(temp)
      }
    }
    return data
  }
  catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const hospitalGetBoxs = async (_id, res) => {
  // const _id="6567038bb3fcd4dd1577a6da"
  try {
    const appointment = await Appointment.find({ hospital: _id, status: "Pending" })
    const doctor = await Doctor.find({ isBlock: false, hospital: _id })
    const hospital = await Hospital.findById(_id).populate("department")
    const history = await History.find({ hospitalId: _id })
    let data = {
      appointment: appointment.length,
      departments: hospital.department.length,
      doctor: doctor.length,
      records: history.length
    }
    return data;
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};


export {
  adminGetdepartment,
  adminGetBoxs,
  hospitalHistoryCount,
  hospitaldepartmentHistory,
  hospitalDoctorHistory,
  hospitalGetBoxs
}