import {readPosts, writePosts} from '../services/post.services.js';

export function addPost(req, res) {
    try {
    const { legend, description, imageUrl } = req.body;
    if (!legend || !description || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    let posts = readPosts();
    let post = { 
        id: Date.now(), 
        legend, 
        description, 
        imageUrl 
    };
    posts.unshift(post);
    writePosts(posts);

    res.status(201).json({message: "Post created successfully", post});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function getPosts(req, res) {
    try {
        let posts = readPosts();
        res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { legend, description, imageUrl } = req.body;
        let posts = readPosts();

        const postIndex = posts.findIndex(p => p.id === Number(id));
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }
        posts[postIndex] = { 
            ...posts[postIndex], 
            legend, 
            description, 
            imageUrl 
        };
        writePosts(posts);
        res.status(200).json({message: "Post updated successfully", post: posts[postIndex]});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function deletePost(req, res) {
    try {
        const { id } = req.params;
        let posts = readPosts();
        posts = posts.filter(p => p.id !== Number(id));
        writePosts(posts);
        res.status(200).json({message: "Post deleted successfully"});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
        