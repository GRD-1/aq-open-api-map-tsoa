import { IPost } from '../types/post.types';
import logger from '../config/logger';

export class PostService {
  private posts: IPost[] = [
    {
      id: 1,
      name: "First Post",
      alias: "first-post",
      date: "2024-03-20",
      rowCount: 10,
      isImportant: true,
      childrens: [
        { id: 1, name: "Child 1" },
        { id: 2, name: "Child 2" }
      ]
    },
    {
      id: 2,
      name: "Second Post",
      alias: "second-post",
      date: "2024-03-21",
      rowCount: 15,
      isImportant: false,
      childrens: [
        { id: 3, name: "Child 3" }
      ]
    }
  ];

  public getAllPosts(): IPost[] {
    return this.posts;
  }

  public getPostById(id: number): IPost {
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  public createPost(postData: Omit<IPost, 'id'>): IPost {
    const newPost: IPost = {
      id: Math.max(...this.posts.map(p => p.id)) + 1,
      ...postData
    };
    this.posts.push(newPost);
    return newPost;
  }

  public updatePost(id: number, updateData: Partial<IPost>): IPost {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    this.posts[index] = { ...this.posts[index], ...updateData };
    return this.posts[index];
  }

  public deletePost(id: number): void {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    this.posts.splice(index, 1);
  }
} 