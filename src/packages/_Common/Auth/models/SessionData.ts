export interface SessionData {
  accessToken: string;
  refreshToken: string;
  profile: {
    fullName: string;
    avatar: string;
  };
}
