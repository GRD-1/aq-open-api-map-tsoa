import { Controller, Route, Get, Post, Put, Delete, Path, Body } from 'tsoa';
import { IPost } from '../types/post.types';
import { PostService } from '../services/post.service';
import logger from '../config/logger';

@Route('posts')
export class PostController extends Controller {
  private postService: PostService;

  constructor() {
    super();
    this.postService = new PostService();
  }

  @Get()
  public async getAllPosts(): Promise<IPost[]> {
    logger.info('Fetching all posts');
    return this.postService.getAllPosts();
  }

  @Get('{id}')
  public async getPostById(@Path() id: number): Promise<IPost> {
    logger.info('Fetching post by id', { id });
    return this.postService.getPostById(id);
  }

  @Post()
  public async createPost(@Body() postData: Omit<IPost, 'id'>): Promise<IPost> {
    logger.info('Creating new post', { postData });
    return this.postService.createPost(postData);
  }

  @Put('{id}')
  public async updatePost(@Path() id: number, @Body() updateData: Partial<IPost>): Promise<IPost> {
    logger.info('Updating post', { id, updateData });
    return this.postService.updatePost(id, updateData);
  }

  @Delete('{id}')
  public async deletePost(@Path() id: number): Promise<void> {
    logger.info('Deleting post', { id });
    await this.postService.deletePost(id);
  }
} 