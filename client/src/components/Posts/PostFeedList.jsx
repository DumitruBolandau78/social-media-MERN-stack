import PostFeed from './PostFeed';
import { useState, useEffect } from 'react';
import { domain } from '../../utils/variables';
// eslint-disable-next-line react/prop-types
const PostList = ({ posts, setPosts }) => {
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    const response = await fetch(domain + `/api/getPosts?page=${page}`, { credentials: 'include' });
    const data = await response.json();

    setPosts(prevPosts => [...prevPosts, ...data]);
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  window.onscroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      fetchPosts();
    }
  };

  return (
    <div className='mt-7'>
      { posts.map(post => <PostFeed key={post._id} {...post} username={post.user.username} name={post.user.name} avatarUrl={post.user.avatarUrl} />)}
    </div>
  ) 
}

export default PostList;