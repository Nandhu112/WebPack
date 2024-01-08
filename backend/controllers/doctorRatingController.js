import asyncHandler from "express-async-handler"
import DoctorRating from "../models/doctorRating.js";


const addNewDoctorRating = asyncHandler(async (req, res) => {
  const { rating, doctor } = req.body;
  try {
    const doctorRating = await DoctorRating.create({
      doctor,
      rating,
    });
    res.json({ result: "Notification added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getDoctorsRatingInfo = asyncHandler(async (req, res) => {
  try {
    const doctorsInfo = await DoctorRating.aggregate([
      {
        $group: {
          _id: '$doctor',
          count: { $sum: 1 }, // Count of ratings for each hospital
          average: { $avg: '$rating' } // Average rating for each hospital
        }
      }
    ]);
    res.json(doctorsInfo)
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Error fetching hospitals ratings.');
  }

});


export {
  addNewDoctorRating,
  getDoctorsRatingInfo
}