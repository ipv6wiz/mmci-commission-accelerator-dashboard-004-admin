export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  lastLogin: string;
  disabled?: boolean;
  roles?: string[];
  token?: string;
  defaultPage?: string; //landing page when user logs in
}
