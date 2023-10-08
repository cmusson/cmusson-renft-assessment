export interface User {
  username: string;
  password: string;
  friends: string[];
  posts: {
    content: string;
    timestamp: string;
  }[];
}
