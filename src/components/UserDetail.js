import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUsers, fetchPosts } from "../services/api";
import "./UserDetail.css";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResponse = await fetchUsers();
        const userData = userResponse.data.find((u) => u.id === parseInt(userId));
        setUser(userData);

        const postsResponse = await fetchPosts();
        const userPosts = postsResponse.data.filter(
          (post) => post.userId === parseInt(userId)
        );
        setPosts(userPosts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getUserData();
  }, [userId]);

  const reversePosts = () => setPosts([...posts].reverse());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-detail-container">
      <div className="post-by">
        <h2>Posts by {user.name}</h2>
      </div>
      <div className="total-posts">
        <Link to="/" className="back-button">
          Back
        </Link>
        <p style={{ fontWeight: "bold" }}>Total Posts: {posts.length}</p>
      </div>
      <div className="user-detail">
        <div className="user-info">
          <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="user-image" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="user-posts">
          {posts.map((post) => (
            <div key={post.id} className="post-title">
              <p>{post.title}</p>
            </div>
          ))}
          <button onClick={reversePosts} className="reverse-button">
            Reverse Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
