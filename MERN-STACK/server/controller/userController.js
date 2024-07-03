import User from "../model/userModel.js"

//posting data to database
export const create = async(req,res)=>{
    try {
        const newUser = new User(req.body);
        const{email} = newUser;
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message : "User already exist."})
        }

        const savedData = await newUser.save();
        //res.status(200).json(savedData);
        res.status(200).json({message:"User Created!"});



    } catch (error) {
        res.status(500).json({error:"insternal error"})
    }
}

//getting user data
export const getAllUsers = async(req,res)=>{
    try {
      const userData=await User.find();
      if(!userData || userData.length===0){
        return res.status(404).json({message : "Users not Found."})
      }
      res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id; // Make sure to use req.params.id to get the ID from the URL parameter
        const userExist = await User.findById(id);
        
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json(userExist);
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


//update user
export const update = async (req,res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({ message: "User not found." });
        }
        const updateData = await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
       //res.status(200).json(updateData); 
       res.status(200).json({message:"User Updated!"});
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//delete user
export const deleteUser = async(req,res)=>{
    try {
        const id =req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted!"})

    } catch (error) {
        console.error("Error in deleting user:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
}