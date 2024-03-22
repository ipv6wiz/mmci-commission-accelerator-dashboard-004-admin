export interface UserDto {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  lastLogin?: string;
  disabled?: boolean;
  roles?: string[];
  token?: string;
  defaultPage?: string; //landing page when user logs in
}
