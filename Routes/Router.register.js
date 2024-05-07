const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// new registeration api
const registerRouter = (data) => {
    router.post('/', async (request, response) => {
        const { studentId, email, password, name, phone, dietaryRestrictions, street, city, state, zip, role, verification_status, profile_picture, notification_preferences } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const current_date_time = new Date().toLocaleTimeString();
        const registrationQuery = `
            INSERT INTO studentDetails(studentId, email, password, name, phone, dietaryRestrictions, address_street, address_city, address_state, address_zip, role, registeration_date, verification_status, profile_picture, notification_preferences)
            VALUES (
                '${studentId}',
                '${email}',
                '${hashedPassword}',
                '${name}',
                '${phone}',
                '${dietaryRestrictions}',
                '${street}',
                '${city}',
                '${state}',
                '${zip}',
                '${role}',
                '${current_date_time}',
                '${verification_status}',
                '${profile_picture}',
                '${notification_preferences}'
            );
        `;
        try {
            await data.run(registrationQuery);
            response.send("registration successful");
        } catch (error) {
            console.log("Error registering user:", error.message);
            response.status(500).send("Registration failed");
        }
    });

    // get all registered users data
    router.get("/", async (request, response) => {
        const displayAllregisteredDetailsQuery = `
            SELECT * FROM studentDetails
        `;
        try {
            const displayAllregisteredDetailsArr = await data.all(displayAllregisteredDetailsQuery);
            console.log(displayAllregisteredDetailsArr, 'details');
            response.send(displayAllregisteredDetailsArr);
        } catch (error) {
            console.log("Error retrieving registered details:", error.message);
            response.status(500).send("Error retrieving registered details");
        }
    });

    //updating the user registered details or user profile updation
    router.put("/:id",async(request,response)=>{
        const {studentId}=request.params
        const {email, password, name, phone, dietaryRestrictions, street, city, state, zip, role, verification_status, profile_picture, notification_preferences } = request.body;
        let hashedPassword=password;
        if(password){
            hashedPassword=await bcrypt.hash(password,10);
        }

        const updateUserQuery=`
        UPDATE studentDetails
        SET email = ?, password = ?, name = ?, phone = ?, dietaryRestrictions = ?,
            address_street = ?, address_city = ?, address_state = ?, address_zip = ?,
            role = ?, verification_status = ?, profile_picture = ?, notification_preferences = ?
        WHERE studentId = ?
        `
        const values=[
            email, hashedPassword, name, phone, dietaryRestrictions,
            street, city, state, zip, role, verification_status,
            profile_picture, notification_preferences, studentId
        ]
        try{
            await data.run(updateUserQuery,values);
            response.send("Profile Details Updated Successfully")
        }
        catch(error){
            console.log('Error while updating the details',error.message)
            response.status(500).send("Error Updating the user Details")
        }

    })


    //delete a registered user account
    //delete a registered user account
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const deleteUserQuery = `
        DELETE FROM studentDetails
        WHERE studentId = ?
    `;
    try {
        await data.run(deleteUserQuery, [id]);
        response.send("User deleted successfully");
    } catch (error) {
        console.log("Error while deleting the user:", error.message);
        response.status(500).send("Error while deleting the user details");
    }
});




    return router;
};

module.exports = registerRouter;
