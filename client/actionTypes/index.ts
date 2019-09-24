export default interface I_state {
  user: I_userState;
  post: I_postState;
  profile: I_profileState;
  follow: I_followState;
  group: I_groupState;
}

export interface I_userState {
  myInfo: {
    userId: string;
  };
  isSignup: string;
  message: string;
  error: Error;
}

export interface I_postState {
  postData: I_postData[];
  loadPlaceData: string;
  images: string;
  message: string;
  error: Error;
  isLikes: boolean;
  currentPostData: I_postData;
}

export interface I_postData {
  postId: number;
  userId: string;
  content: string;
  startTime: string;
  finishTime: string;
  privacyBound: string;
  userPost: { userId: string; userProfile: I_userProfile };
  postImage: [{ postId: number; src: string }];
  postLike: [{ postId: number; userId: string; likeUserProfile: I_userProfile }];
  postReply: [];
}

interface I_userProfile {
  userName: string;
  profileImage: string;
}

export interface I_profileState {
  userName: string;
  profileImage: string;
  message: string;
  error: Error;
}

export interface I_followState {
  myFollow: follow;
  userFollow: follow;
  message: string;
  error: Error;
}

interface follow {
  followees: string[];
  followers: string[];
}

export interface I_groupState {
  myGroupInfo: {};
  myGroupNameList: {}[];
  message: string;
  error: Error;
}
