// app/news/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Post = {
  post_id: number;
  post_title: string;
  post_subtitle: string;
  post_content: string;
  date: string;
  img: string;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.post_title}</h1>
      <h3>{post.post_subtitle}</h3>
      {post.img && (
        <img
          src={`http://localhost:5000/uploads/${post.img}`}
          alt={post.post_title}
          width="600"
        />
      )}
      <p>{post.post_content}</p>
      <small>{post.date}</small>
    </div>
  );
}
