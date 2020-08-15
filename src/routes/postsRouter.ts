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
        res.json(posts)
    }

    async getPost(req: Request, res: Response) {
        const post = await Post.findOne({ slug: req.params.url });
        res.json(post)
    }

    async createPost(req: Request, res: Response) {
        const { title, slug, content, imageUrl } = req.body
        const newPost = new Post({ title, slug, content, imageUrl });
        await newPost.save();
        res.json({ data: newPost })
    }

    async updatePost(req: Request, res: Response) {
        const { slug } = req.params
        const post = await Post.findOneAndUpdate({ slug }, req.body, { new: true })
    }

    async deletePost(req: Request, res: Response) {
        const { slug } = req.params
        await Post.findOneAndDelete({slug})
        res.json({
            res: 'Post deleted'
        }) 
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