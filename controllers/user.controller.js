import User from "../models/userSchema.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updateUser
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


      
export async  function deleteUser(req, res){
  try {
    const deleteUser = await User.findByIdAndDelete(req.user.id)
    if(!deleteUser){
      return res.status(404).json({message:"User not found"})
    }

    deleteUser.password = undefined
    res.status(200).json({
      message: "User deleted successfully",
      user: deleteUser
    })
  } catch (error) {
    res.status(500).json({message:"INernal server error"})
  }
}
  