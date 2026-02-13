import fs from 'fs';
const file = 'posts.json';

function readPosts() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(file, JSON.stringify(posts, null, 2));
}

export { readPosts, writePosts };
