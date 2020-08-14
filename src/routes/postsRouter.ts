import { Request, Response, Router } from 'express';

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getPosts(req: Request, res: Response) {
        res.send('posts')
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

export default postsRouter.router;