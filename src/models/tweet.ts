import { TwitterUser } from './twitter-user';
export interface Tweet {
  text: string;
  id: number;
  user: TwitterUser;
}
