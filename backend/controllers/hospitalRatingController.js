import asyncHandler from "express-async-handler"
import HospitalRating from "../models/hospitalRatingModel.js";


const addNewRating = asyncHandler(async (req, res) => {   
    console.log('chk addNewRating')       
      const { rating,hospital} = req.body;
      console.log( rating,hospital,'chk addNewRating11')   
      try {
        const hospitalRating = await HospitalRating.create({
            hospital,
            rating,
        });  
        res.json({result:"Notification added successfully"});
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    const getHospitalsRatingInfo = asyncHandler(async (req, res) => {   
        console.log("chkk getHospitalsRatingInfo111")
        try {
            const hospitalsInfo = await HospitalRating.aggregate([
              {
                $group: {
                  _id: '$hospital',
                  count: { $sum: 1 }, // Count of ratings for each hospital
                  average: { $avg: '$rating' } // Average rating for each hospital
                }
              }
            ]); 
          console.log(hospitalsInfo)
          res.json (hospitalsInfo)
          } catch (err) {
            console.error('Error:', err);
            throw new Error('Error fetching hospitals ratings.');
          }
 
        });

export{
    addNewRating,
    getHospitalsRatingInfo
}