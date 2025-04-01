export interface Post {
    id: number;
    title: string;
    body?: string;
    user?: {
      id: number;
      name: string; // Adjust based on the User entity properties
      email?: string; // Assuming User has an email field
      profilePicture?: string;
      facebookId?: string;
      googleId?: string;
      posts?: Post[];
    };
    createdAt?: string; // Date as an ISO string
    updatedAt?: string; // Date as an ISO string
  }