import React from "react";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

import { Post } from "../../graphql/graphql";
import { useHistory } from "react-router";

interface Props {
  posts: Post[] | undefined;
}

export const Posts: React.FC<Props> = ({ posts }) => {
  const history = useHistory();
  return (
    <div className="homepage__posts">
      {posts!.map((post) => (
        <div key={post.id} className="homepage__postCard" onClick={() => history.push("/post/"+post.id)}>
          <div className="homepage__postCard__header">
            <Avatar className="postCard__avatar">
              {post.author?.charAt(0).toUpperCase()}
              {post.author?.charAt(1).toUpperCase()}
            </Avatar>

            <div className="homepage__postCard__header_info">
              <h3>{post.author}</h3>
              <p>On {dayjs(post.createdAt).format("MMMM DD YYYY")}</p>
            </div>
          </div>
          <div className="homepage__postCard__content">
            <header>
              <strong>{post.title.slice(0, 100)}</strong>
            </header>
            <div>{post.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
