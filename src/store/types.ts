export type UserData = {
  userId: number;
  username: string;
  name: string;
  profilePicture: string | null;
  isAdmin: boolean;
};

export interface AuthState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

export interface RootState {
  auth: AuthState;
}
