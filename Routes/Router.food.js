const express=require('express')
const app=express()
const router=express.Router()

app.use(express.json())

const foodRouter=(data)=>{

    // add new food menu api
    router.post('/',async(request,response)=>{
        const{food_id,name,description,category,price,image_url,available}=request.body
        const addMenuQuery=`
        INSERT INTO food(food_id,name,description,category,price,image_url,available)
        VALUES (?,?,?,?,?,?,?)
        `
        const values=[food_id,name,description,category,price,image_url,available];
        try{
            await data.run(addMenuQuery,values)
            response.send("Menu Added Successfully")
        }
        catch(error){
            console.log("Error while adding the menu",error.message)
            response.status(500).send("Error while Adding the menu")
        }
    })

    // get all menu
    router.get('/', async (request, response) => {
        const { name = "", search = "", category = "", price = "asc" } = request.query;
       
        // Build the SQL query with parameterized values
        let displayFoodsQuery = `
            SELECT * FROM food
            WHERE name LIKE ? AND category LIKE ? AND description LIKE ?
            
        `;

        const values = [`%${name}%`, `%${category}%`, `%${search}%`];

        if(price){
            displayFoodsQuery+=`ORDER BY price ${price === "asc" ? "ASC" : "DESC"}`
        }

        try {
            // Execute the query with parameters
            const displayFoods = await data.all(displayFoodsQuery,values);
            response.send(displayFoods);
        } catch (error) {
            console.log("Error while displaying the menu", error.message);
            response.status(500).send("Error while displaying the menu");
        }
    });
    
    

    //get a particular food based on the id

    router.get('/:id',async(request,response)=>{
        const{id}=request.params;
        const displayFoodsQuery=`
        SELECT * FROM food
        WHERE food_id=?
        `
        const values=[id]
        try{
            const displayFoods=await data.all(displayFoodsQuery,values)
            response.send(displayFoods)
        }
        catch(error){
            console.log("Error while displaying the menu",error.message)
            response.status(500).send("Error While displaying the menu")
        }
    })


    // deleting the particular menu based on the id
    router.delete("/:id",async(request,response)=>{
        const{id}=request.params;


        const nameOfTheFoodQuery=`
        SELECT * FROM food
        WHERE food_id=${id}`

        const nameOfTheFood=await data.get(nameOfTheFoodQuery)
        
        const deleteFoodQuery=`
        DELETE FROM  food 
        WHERE food_id=?;
        `
        const values=[id]
        try{
            await data.run(deleteFoodQuery,values)
            response.send(`${nameOfTheFood.name} dish Deleted Successfully`)
        }
        catch(error){
            console.log("Error while deleting the menu",error.message);
            response.status(500).send("Error while deleting the menu")
        }

    }) 

    
    // update the availability or stock of the food or menu
    router.put("/:id",async(request,response)=>{
        const{id}=request.params;
        const {available}=request.body
        const updateStockQuery=`
        UPDATE food 
        SET available=?
        WHERE food_id=?;
        `
        const values=[available,id]
        try{
            await data.run(updateStockQuery,values)
            response.send("Stock updated Successfully")
        }
        catch(error){
            console.log("Error while updating the menu",error.message);
            response.status(500).send("Error while updating the menu")
        }

    }) 

    return router;
}
module.exports=foodRouter