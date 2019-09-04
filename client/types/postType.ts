interface I_postData {
  postId: number;
  authorId: string;
  content: string;
  startTime: Date;
  finishTime: Date;
  privacyBound: string;
  postImage: [{ id: number; postId: number; src: string }];
  postLike: [];
  postReply: [];
}
