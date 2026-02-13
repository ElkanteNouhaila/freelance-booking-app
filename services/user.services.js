import fs from 'fs';
const file = 'users.json';

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

export { readUsers, writeUsers };
