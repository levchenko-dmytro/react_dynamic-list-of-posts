import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const creatComment = ({
  postId, name, email, body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};