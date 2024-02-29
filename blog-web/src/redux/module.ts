
export interface PostState {
  loadingPosts: boolean;
  posts: Post[]

  loadingDeletePost: boolean,
  errDeletePost: any,
  successDeletePost: boolean,

}
export interface CommentState {
  loadingComments: boolean,
  comments: Comment[],

  loadingCommentByPost: boolean;
  commentByPost: Comment[],

  loadingEditCommentById: boolean,
  successEditCommentById: boolean,
  errEditCommentById: any,

}
export interface userState {
  loadingLogin: boolean,
  errLogin: any,
  successLogin: boolean,
  inforLogin: any,

}



export interface Comment {
  id: number
  owner: number
  post: number,
  content: string,
  created_at: Date,
  name: string
}

export interface Post {
  id: number;
  owner: number;
  title: string;
  content: string;
  created_at: Date;
  name: string,
  tags: string[]
}
