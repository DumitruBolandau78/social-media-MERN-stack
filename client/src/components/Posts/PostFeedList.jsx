import PostFeed from './PostFeed';
import { useState, useEffect, useRef } from 'react';
import { domain } from '../../utils/variables';
// eslint-disable-next-line react/prop-types
const PostList = ({ posts, setPosts }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const response = await fetch(domain + `/api/getPosts?page=${page}`, { credentials: 'include' });
    const data = await response.json();

    if(data.length === 0){
      setHasMore(false);
    } else {
      setPosts(prevPosts => [...prevPosts, ...data]);
      setPage(prevPage => prevPage + 1);
    }
  };

  const lastElem = useRef(null);

  function onIntersection(entries){
    const firstEntry = entries[0];

    if(firstEntry.isIntersecting && hasMore){
      fetchPosts();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if(observer && lastElem.current){
      observer.observe(lastElem.current)
    }

    return () => {
      if(observer){
        observer.disconnect();
      }
    }
  }, [posts]);

  return (
    <div className='mt-7'>
      { posts.map(post => <PostFeed posts={posts} setPosts={setPosts} key={'post-feed-' + post._id} {...post} userID={post.user._id} username={post.user.username} name={post.user.name} avatarUrl={post.user.avatarUrl} />)}
      {hasMore? <div className='text-center' ref={lastElem}>Uploading posts...</div> : <div className='text-center font-medium'>No more posts!</div>}
    </div>
  ) 
}

export default PostList;