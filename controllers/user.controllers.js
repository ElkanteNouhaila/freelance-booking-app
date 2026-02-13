import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readUsers, writeUsers } from '../services/user.services.js';

async function signUp(req, res) {
 try {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const users = readUsers();
  const user = { 
    id: Date.now(), 
    firstname, 
    lastname, 
    email, 
    password: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeUsers(users);

  res.status(201).json(user);

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

  
}
  

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const validpass = await bcrypt.compare(password, user.password);
    if (!validpass) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

export { signUp, signIn };