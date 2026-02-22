import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js"

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existinguser = await User.findOne({ email })
    if(existinguser){
      return res.status(409).json({message:"Email already registred"})
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    const newuser = new User({ 
      name, 
      email, 
      password: hashedpassword,
      role:role,
      createdAt: new Date().toISOString()
    });

    await newuser.save()


    res.status(201).json({message:"User sign up successfully", user:newuser});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });

    // //! Handle specific MongoDB errors
    // if (error.name === 'ValidationError') {
    //   return res.status(400).json({ 
    //     message: "Validation error", 
    //     details: error.message 
    //   });
    // }
      
    // if (error.code === 11000) {
    //   return res.status(409).json({ message: "Email already registered" });
    // }
    // return res.status(500).json({ 
    //   message: "Internal server error",
    //   ...(process.env.NODE_ENV === 'development' && { error: error.message })
    // });    
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({email})

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({id: user._id , role: user.role}, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ message: 'Sign in successful', token });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

export { register, login };