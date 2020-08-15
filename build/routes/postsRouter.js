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
const Post_1 = __importDefault(require("../models/Post"));
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.default.find();
            res.json({ 'posts': posts });
        });
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
exports.default = postsRouter.router;
