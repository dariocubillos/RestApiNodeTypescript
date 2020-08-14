"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        res.send('posts');
    }
    getPost() {
    }
    createPost() {
    }
    updatePost() {
    }
    deletePost() {
    }
    routes() {
        this.router.get('/posts', this.getPosts);
        this.router.post('/posts', this.getPosts);
        this.router.get('/posts', this.getPosts);
        this.router.put('/posts', this.getPosts);
    }
}
const postsRouter = new PostRouter();
exports.default = postsRouter.router;
