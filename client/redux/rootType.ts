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
  searchUsers: I_profile[];
  isSignup: boolean;
  isMe: boolean;
  message: string;
  error: Error;
}

export interface I_postState {
  postDatas: I_postData[];
  someonePosts: I_postData[];
  loadPlaceData: string;
  images: string;
  isLike: boolean;
  isReply: boolean;
  isNewPost: boolean;
  currentPostData: I_postData;
  currentReplyPostId: number;
  message: string;
  error: Error;
}

export interface I_postData {
  postId: number;
  userId: string;
  content: string;
  startTime: string;
  finishTime: string;
  privacyBound: string;
  userPost: { userId: string; userProfile: I_profile };
  postImage: [{ postId: number; src: string }];
  postLike: [{ postId: number; userId: string; likeUserProfile: I_profile }];
  postReply: [{ id: number; userId: string; comment: string; replyUserProfile: I_profile }];
}

export interface I_profile {
  userId?: string;
  userName: string;
  profileImage: string;
}

export interface I_profileState {
  myProfile: I_profile;
  someoneProfile: I_profile;
  showFollowings: Boolean;
  showFollowers: Boolean;
  message: string;
  error: Error;
}

export interface I_followState {
  myFollow: I_followInfo;
  someoneFollow: {
    someoneId: string;
    followees: { followeeId: string; followeeProfile: I_profile }[];
    followers: { followerId: string; followerProfile: I_profile }[];
  };
  message: string;
  error: Error;
}

export interface I_followInfo {
  followees: { followeeId: string; followeeProfile: I_profile }[];
  followers: { followerId: string; followerProfile: I_profile }[];
}

export interface I_groupState {
  myGroupInfo: {};
  myGroupNameList: {}[];
  message: string;
  error: Error;
}
