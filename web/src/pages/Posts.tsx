import React from "react";

import "../styles/Home.css";
import { usePostQuery } from "../graphql/graphql";
import { PostDetail } from "../components/PostDetail";
import { useHistory } from "react-router-dom";

const Post: React.FC = () => {
  const history = useHistory();
  const { data, loading } = usePostQuery({
       variables: {
          postId: history.location.pathname.split("/")[2]
       },
     });

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="homepage__layout">
      <PostDetail post={data?.post} />
    </div>
  );
};

export default Post;