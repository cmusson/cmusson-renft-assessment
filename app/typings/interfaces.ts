export interface IUser {
  username: string;
  password: string;
  friends: string[];
  posts: {
    content: string;
    timestamp: string;
  }[];
}

export interface IPost {
  username: string;
  content: string;
  timestamp: string;
}
