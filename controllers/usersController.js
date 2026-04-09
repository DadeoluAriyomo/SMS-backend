const db=require("../prisma/db")
const z=require("zod")
// //Get all users
// let{users}= require('../DATA/data');
// const getAllUsers=(req,res)=>{
//     try{
//         return res.json({
//         data: users,
//     })

//     }catch(error){
//         console.log("Error fetching users:",error)
//     }
// }


// //Get a user by id
// const getUserById=(req,res)=>{
    
//     try{
//         const userIdString=req.params.id ;
//         const userId=parseInt(userIdString)
//         if(!userId){
//             return res.status(400).json({
//                 error:"Invalid user ID"

//             })
//         }
//         const foundUser= users.find((user)=> user.id===userId);
//         if(!foundUser){
//             return res.status(404).json({
//                 error:"User not found"
//             })
//         }
//         return res.json({
//             data: foundUser
//         })

//     }catch(error){
//         console.log("Error fetching User by ID:",error)
//     }
// }
// //Create a new user 
// const createUser=(req,res)=>{
//     try{
//         const requestData=req.body;
//         {
//             const name=requestData.name;
//             const email=requestData.email;
//             if(!name){
//                 return res.status(400).json({
//                     error:"Name is required"
//                 })
//             }
//             if(!email){
//                 return res.status(400).json({
//                     error:'No email sent'
//                 })
//             }
//             const usersLength= users.length;
//             users.push({
//             id:usersLength+1,
//             name:name,
//             email:email
//             })
//         }
//         return res.json({
//                 message:"data is saved successfully",
//                 data: users
//         })
//     }catch(error){
//         console.log("Error creaating new user:",error)
//     }
// }
// // Update a user
//     const updateUser=(req,res)=>{
//         try{
//             const useridString=req.params.id;
//             const userid=parseInt(useridString);
//             const user=users.find((u)=>u.id===userid);
//             if(!user){
//                 return res.status(404).json({
//                     error:"User not found"
//                 })
//             }
//             const {name,email}=req.body;
//             const updatedName=name ||user.name;
//             const updatedEmail=email ||user.email;

//             user.name=updatedName;
//             user.email=updatedEmail;
//             return res.json({
//                 message:"user updated successfully",
//                 data: user
//             })
//         }catch(error){
//             console.log("Error updating users")
//         }
//     }
// //Delete a user
// const deleteUser=(req,res)=>{
//     try{
//         const userIdString=req.params.id;
//         const userId= parseInt(userIdString);
//         const user=users.find(u=>u.id===userId);
//         if(!user){
//             return res.status(404).json({
//                 error:"User not found"
//             })
//         }
//         users=users.filter((u)=>u.id!==userId);
//         return res.json({
//             message:"User deleted successfully",
//             data:users
//         })

//     }catch(error){
//         console.log("Error deleting user")
//     }
// }
// // export default getAllUser\
// module.exports={
//     getAllUsers,getUserById,createUser,updateUser,deleteUser
// }
const getAllUsers=async(req,res)=>{
    try{
        const users=await db.user.findMany();
        return res.json({
            data:users
    })
}catch(error){
    console.log("Error fetching all users:",error)
}
}
const createUser= async(req,res)=>{
    try{
        const requestBody=req.body;
        const createUserSchema=z.object({
            name:z.string(),
            email:z.email(),
            level:z.string(),
            gender: z.enum(["Male", "Female"]),
            password:z.string().min(8).max(12)
        })
        const validated =createUserSchema.parse(requestBody);
        
        if(!requestBody.name){
            return res.status(400).json({
                error:"No name is sent "
            })
        }if(!requestBody.email){
            return res.status(400).json({
                error:"No email is sent "
            })
        }if(!requestBody.password){
            return res.status(400).json({
                error:"No password is sent"
            })
        }if(!requestBody.gender){
            return res.status(400).json({
                error:"No gender is sent"
            })
        }if(!requestBody.level){
            return res.status(400).json({
                error:"No level is sent"
            })
        }
        const newUser= await db.user.create({
            data:{
                name:requestBody.name,
                email:requestBody.email,
                password:requestBody.password,
                level:parseInt(requestBody.level),
                gender:requestBody.gender,
            }
        });
        if(!newUser){
            return res.status(500).json({
                error:"Unable to create user"
            })
        }
        return res.json({
            message:"User create succesfully",
            data:newUser
        })
    }catch(error){
        console.log("Error creating user:", error );
        if( typeof error=== z.ZodError){
            const messages=[];
            error.map()
        }
    }
}

const getUserById= async(req,res)=>{
    try{
        const userIdString= req.params.id;
        if(!userIdString){
            return res.status(400).json({
                error:"Invalid user ID"
            })
        }
        const userId=parseInt(userIdString);
        const user= await db.user.findUnique({
            where:{
                id:userId
            }
        });
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
        return res.json({
            data:user
        })
    }catch(error){
        console.log("Error fetching user by ID:",error)
    }
}

const deleteUser =async(req,res)=>{
    try{
        const userIdString=req.params.id;
        if(!userIdString){
            return res.status(400).json({
                error:"Invalid user ID"
            })
        }
        const userId=parseInt(userIdString);
        const deleted= await db.user.delete({
            where:{
                id:userId
            }
        });
        if(!deleted){
            return res.status(500).json({
                error:"Unable to delete user"
            })
        }
        return res.json({
            message:"Record deleted successfully",
            data:deleted
        })



    }catch(error){
        console.log("Error deleting user:",error)
    }
}
const updateUser= async(req,res)=>{
        try{
            const userIdString=req.params.id;
            if(!userIdString){
                return res.status(400).json({
                    error:"Ivalid user ID"
                })
            }
        const userId= parseInt(userIdString);
        const { name, email, password, gender, level } = req.body;
        const updatedUser= await db.user.update({
        where:{
            id:userId
        },
        data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(password && { password }),
                ...(gender && { gender }),
                ...(level && { level:parseInt(level) })
            }
        });
        return res.json({
            message:"User updated successfully",
            data:updatedUser
        })

        }catch(error){
            console.log("Error updating user:",error);
            if (error.code === 'P2025') {
                return res.status(404).json({
                error: "User not found"
                });
            }
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "Email already exists"
                });
            }
            return res.status(500).json({
                error: "Something went wrong"
            });
            
        }
}
module.exports={
    getAllUsers,createUser,getUserById,deleteUser,updateUser
}