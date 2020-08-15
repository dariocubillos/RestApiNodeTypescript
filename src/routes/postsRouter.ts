import { Request, Response, Router } from 'express';
import Post from '../models/Post';

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts(req: Request, res: Response) {
        const posts = await Post.find()
        res.json({ 'posts': posts })
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
        this.router.get('/post/:slug', this.getPost);
        this.router.post('/posts', this.createPost);
        this.router.patch('/post/:slug', this.updatePost);
        this.router.delete('/posts/slug', this.deletePost);
    }
}

const postsRouter = new PostRouter();

export default postsRouter.router;