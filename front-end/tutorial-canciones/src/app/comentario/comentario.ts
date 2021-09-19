export class Comentario {

  commentId: number;
  currentDate: Date;
  commentTxt: string;
  user_name: string;
  userId: number;
  resourceId: number;
  resourceType: string;

  constructor(commentId: number,
    currentDate: Date,
    commentTxt: string,
    user_name: string,
    userId: number,
    resourceId: number,
    resourceType: string) {
      this.commentId = commentId;
      this.currentDate = currentDate;
      this.commentTxt = commentTxt;
      this.user_name = user_name;
      this.userId = userId;
      this.resourceId = resourceId;
      this.resourceType = resourceType;
    }

}
