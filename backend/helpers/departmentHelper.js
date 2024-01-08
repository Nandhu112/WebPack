import asyncHandler from "express-async-handler"
import Department from "../models/departmentModel.js"
import Hospital from "../models/hospitalModel.js"
import Appointment from "../models/appointmentModel.js";
import History from "../models/history.js";


const addDepartment = async (name, res) => {
  try {
    const departmentExists = await Department.findOne({ name });
    if (departmentExists) {
      return ({ error: "Department already exists" });
    } else {
      const department = await Department.create({ name });
      return { success: "Department added successfully", department };
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const listDepartment = async (status, res) => {
  // try {
  //   
  //   const departments = await Department.find({ isBlock: status1 })
  //     .sort({ createdAt: -1 }); // Sort by createdAt field in descending order (-1)

  //   return departments;
  // } catch (error) {
  //   res.status(500).json({ error: "Internal server error" });

  // }
  try {
    const status1 = status == "blocked";
    const departments = await Department.find({isBlock: status1});

    const departmentDataPromises = departments.map(async (department) => {
      const departmentId = department._id;
      const appointmentCount = await Appointment.countDocuments({ department: departmentId });
      const historyCount = await History.countDocuments({ depatrmentId: departmentId });

      return {
        departmentDetails: department,
        appointmentCount,
        historyCount,
      };
    });

    const departmentsWithData = await Promise.all(departmentDataPromises);

    return departmentsWithData;
  } catch (error) {
    return { error: 'An error occurred while fetching departments data' };
  }
};

const hospitalAddDepartment = async (h_id, dept_id) => {
  try {
    const hospital = await Hospital.findById(h_id);
    if (!hospital) {
      return { error: 'Hospital not found' };
    }
    // Update the department array using push and $each
    hospital.department.push(...dept_id);
    await hospital.save();

    for (const deptId of dept_id) {
      const department = await Department.findById(deptId);
      if (!department) {
        return { error: `Department with ID ${deptId} not found` };
      }
      department.hospital.push(h_id);
      await department.save();
    }
    return { success: 'Department added successfully' };
  } catch (error) {
    return { error: error.message || 'Internal server error' };
  }
};
const listHospitalAllDepartments = async (h_id, res) => {

  try {
    const hospital = await Hospital.findById(h_id);
    if (!hospital) {
      return { error: `Hospital not Found` };
    }
    else {
      const departments = await hospital.populate('department')
      return (departments.department)
    }

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const blockDepartment = async (_id, res) => {
  console.log("chkk blk dept",_id)
  try {
    const department = await Department.findById(_id);
    if (department) {
      department.isBlock = true; // Assuming this is meant to be 'isBlocked'
      await department.save();
    }
    return { success: "Department Blocked successfully" }; // Returned object corrected
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const unBlockDepartment = async (_id, res) => {
  try {
    const department = await Department.findById(_id);
    if (department) {
      department.isBlock = false; // Assuming this is meant to be 'isBlocked'
      await department.save();
    }
    return { success: "Department UnBlocked successfully" }; // Returned object corrected
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



export {
  addDepartment,
  listDepartment,
  hospitalAddDepartment,
  listHospitalAllDepartments,
  blockDepartment,
  unBlockDepartment
};   