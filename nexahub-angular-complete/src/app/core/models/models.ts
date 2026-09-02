export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'Calculator' | 'Feedback' | 'Account';
  title: string;
  detail: string;
  time: string;
}

export interface Feedback {
  id: string;
  service: string;
  rating: number;
  message: string;
  createdAt: string;
}
