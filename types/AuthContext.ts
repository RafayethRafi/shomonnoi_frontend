import { User } from "./User";

export interface AuthContextData {
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUserInfo: (data: User) => void;
  authenticated: boolean;
  token: string | null;
  user: User | null;
}
