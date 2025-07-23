import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "匿名用戶",
      content: "我覺得某些公司真的很壓榨員工...",
      likes: 28,
      comments: 4,
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          author: "匿名用戶",
          content: newPost,
          likes: 0,
          comments: 0,
        },
        ...posts,
      ]);
      setNewPost("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <Head>
        <title>自由發言區</title>
      </Head>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>自由發言區</h1>
      <div style={{ marginBottom: "2rem" }}>
        <textarea
          placeholder="發表你的想法..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ width: "100%", height: "100px", marginBottom: "1rem" }}
        />
        <button onClick={handlePost}>發表貼文</button>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p style={{ color: "#666", fontSize: "14px" }}>{post.author}</p>
          <p style={{ margin: "0.5rem 0" }}>{post.content}</p>
          <div style={{ fontSize: "12px", color: "#999" }}>
            ❤️ {post.likes}　💬 {post.comments}
          </div>
        </div>
      ))}
    </div>
  );
}