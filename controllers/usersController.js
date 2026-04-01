//Get all users
let{users}= require('../DATA/data');
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
        {
            const name=requestData.name;
            const email=requestData.email;
            if(!name){
                return res.status(400).json({
                    error:"Name is required"
                })
            }
            if(!email){
                return res.status(400).json({
                    error:'No email sent'
                })
            }
            const usersLength= users.length;
            users.push({
            id:usersLength+1,
            name:name,
            email:email
            })
        }
        return res.json({
                message:"data is saved successfully",
                data: users
        })
    }catch(error){
        console.log("Error creaating new user:",error)
    }
}
// Update a user
    const updateUser=(req,res)=>{
        try{
            const useridString=req.params.id;
            const userid=parseInt(useridString);
            const user=users.find((u)=>u.id===userid);
            if(!user){
                return res.status(404).json({
                    error:"User not found"
                })
            }
            const {name,email}=req.body;
            const updatedName=name ||user.name;
            const updatedEmail=email ||user.email;

            user.name=updatedName;
            user.email=updatedEmail;
            return res.json({
                message:"user updated successfully",
                data: user
            })
        }catch(error){
            console.log("Error updating users")
        }
    }
//Delete a user
const deleteUser=(req,res)=>{
    try{
        const userIdString=req.params.id;
        const userId= parseInt(userIdString);
        const user=users.find(u=>u.id===userId);
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
        users=users.filter((u)=>u.id!==userId);
        return res.json({
            message:"User deleted successfully",
            data:users
        })

    }catch(error){
        console.log("Error deleting user")
    }
}
// export default getAllUser\
module.exports={
    getAllUsers,getUserById,createUser,updateUser,deleteUser
}