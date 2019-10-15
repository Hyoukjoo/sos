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
  postDatas: I_postData[];
  loadPlaceData: string;
  images: string;
  message: string;
  error: Error;
  isLike: boolean;
  isReply: boolean;
  isNewPost: boolean;
  currentPostData: I_postData;
  currentReplyPostId: number;
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
  postReply: [{ id: number; userId: string; comment: string; replyUserProfile: I_userProfile }];
}

export interface I_userProfile {
  userName: string;
  profileImage: string;
}

export interface I_profileState {
  userName: string;
  profileImage: string;
  showFollowings: Boolean;
  showFollowers: Boolean;
  message: string;
  error: Error;
}

export interface I_followState {
  myFollow: I_followInfo;
  userFollow: I_followInfo;
  message: string;
  error: Error;
}

export interface I_followInfo {
  followees: { followeeId: string; followeeProfile: I_userProfile }[];
  followers: { followerId: string; followerProfile: I_userProfile }[];
}

export interface I_groupState {
  myGroupInfo: {};
  myGroupNameList: {}[];
  message: string;
  error: Error;
}
