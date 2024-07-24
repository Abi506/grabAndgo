const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Assuming you have a Food model to fetch food details
const food = require('../../model/food');
const rating = require('../../model/ratings');

// Function to get food with average rating
async function getFoodWithAverageRating(foodId) {
    try {
        const result = await rating.aggregate([
            { $match: { foodId: ObjectId(foodId) } }, // Match ratings for the given foodId
            {
                $group: {
                    _id: "$foodId", // Group by foodId
                    averageRating: { $avg: "$rating" }, // Calculate average rating
                    count: { $sum: 1 } // Optional: count the number of ratings
                }
            },
            {
                $lookup: {
                    from: 'food', // Name of the food collection
                    localField: '_id',
                    foreignField: '_id',
                    as: 'foodDetails'
                }
            },
            { $unwind: "$foodDetails" }, // Unwind the array from lookup
            {
                $project: {
                    _id: 0, // Exclude _id field
                    food: "$foodDetails", // Include food details
                    averageRating: 1, // Include average rating
                    count: 1 // Optional: include count of ratings
                }
            }
        ]);

        return result.length > 0 ? result[0] : null; // Return the first result or null if no ratings
    } catch (error) {
        console.error("Error getting food with average rating:", error);
        throw error;
    }
}

module.exports = { getFoodWithAverageRating };
