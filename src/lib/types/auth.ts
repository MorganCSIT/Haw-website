export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
}