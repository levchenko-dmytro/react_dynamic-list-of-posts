import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { GlobalContext } from '../GlobalContetxt';
import * as commentsService from '../api/comments';

type Props = {
  post: Post;
};

export const PostInfo: React.FC<Props> = ({ post }) => {
  const {
    postId,
    setPostId,
    setIsLoadingComments,
    setComments,
    setIsErrorComments,
  } = useContext(GlobalContext);

  const handleButtonClick = () => {
    setPostId(post.id === postId ? 0 : post.id);
    setIsLoadingComments(true);

    commentsService.getComments(postId)
      .then((newComments) => {
        setComments(newComments);
        setIsErrorComments(false);
      })
      .catch(() => {
        setComments([]);
        setIsErrorComments(true);
      })
      .finally(() => setIsLoadingComments(false));
  };

  return (
    <tbody>
      <tr data-cy="Post">
        <td data-cy="PostId">
          {post.id}
        </td>

        <td data-cy="PostTitle">
          {post.title}
        </td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={classNames(
              'button',
              'is-link',
              { 'is-light': postId !== post.id },
            )}
            onClick={handleButtonClick}
          >
            {postId === post.id
              ? (
                'Close'
              ) : (
                'Open'
              )}
          </button>
        </td>
      </tr>
    </tbody>
  );
};