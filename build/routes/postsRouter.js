"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const Post_1 = __importDefault(require("../models/Post"));
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.default.find();
            res.json(posts);
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.findOne({ slug: req.params.url });
            res.json(post);
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, slug, content, imageUrl } = req.body;
            const newPost = new Post_1.default({ title, slug, content, imageUrl });
            yield newPost.save();
            res.json({ data: newPost });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const post = yield Post_1.default.findOneAndUpdate({ slug }, req.body, { new: true });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            yield Post_1.default.findOneAndDelete({ slug });
            res.json({
                res: 'Post deleted'
            });
        });
    }
    routes() {
        this.router.get('/posts', [auth_1.auth], this.getPosts);
        this.router.get('/post/:slug', this.getPost);
        this.router.post('/posts', this.createPost);
        this.router.patch('/post/:slug', this.updatePost);
        this.router.delete('/posts/slug', this.deletePost);
    }
}
const postsRouter = new PostRouter();
exports.default = postsRouter.router;
