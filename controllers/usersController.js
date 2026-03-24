//Get all users
const {users}= require('../DATA/data');
const getAllUsers=(req,res)=>{
    try{
        return res.json({
        data: users,
    })

    }catch(error){
        console.log("Error fetching users:",error)
    }
}


//Get a user by id
const getUserById=(req,res)=>{
    
    try{
        const userIdString=req.params.id ;
        const userId=parseInt(userIdString)
        if(!userId){
            return res.status(400).json({
                error:"Invalid user ID"

            })
        }
        const foundUser= users.find((user)=> user.id===userId);
        if(!foundUser){
            return res.status(404).json({
                error:"User not found"
            })
        }
        return res.json({
            data: foundUser
        })

    }catch(error){
        console.log("Error fetching User by ID:",error)
    }
}
//Create a new user 
const createUser=(req,res)=>{
    try{
        const requestData=req.body;
        return res.json({
            data:requestData
        })
    }catch(error){
        console.log("Error creaating new user:",error)
    }
}
// Update a user
//Delete a user
// export default getAllUser\
module.exports={
    getAllUsers,getUserById,createUser
}