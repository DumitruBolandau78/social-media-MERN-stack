import PostFeed from './PostFeed';
import { useState, useEffect, useRef } from 'react';
import CommentBox from '../CommentBox';
// eslint-disable-next-line react/prop-types
const PostList = ({ posts, setPosts }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isOpenModal, toggle] = useState(false);
  const [comments, setComments] = useState([]);

  function handlOpenModal(bool) {
    toggle(bool);
  }

  const fetchPosts = async () => {
    
    const response = await fetch(process.env.DOMAIN + `/api/getPosts?page=${page}`);
    const data = await response.json();
    if (data.length < 5) {
      setHasMore(false);
      setPosts(prevPosts => [...prevPosts, ...data]);
    } else {
      setPosts(prevPosts => [...prevPosts, ...data]);
      setPage(prevPage => prevPage + 1);
      
    }
  };

  const lastElem = useRef(null);

  function onIntersection(entries) {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      fetchPosts();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && lastElem.current) {
      observer.observe(lastElem.current)
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [posts]);

  useEffect(() => {

  }, []);

  const commentContainer = useRef();

  useEffect(() => {
    if(commentContainer.current){
      commentContainer.current.scrollTop = commentContainer.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className='mt-7'>
      {posts.map(post => <PostFeed setComments={setComments} handlOpenModal={handlOpenModal} posts={posts} setPosts={setPosts} key={'post-feed-' + post._id} {...post} userID={post.user._id} username={post.user.username} name={post.user.name} avatarUrl={post.user.avatarUrl} />)}
      {hasMore ? <div className='text-center' ref={lastElem}>Uploading posts...</div> : <div className='text-center font-medium'>No more posts!</div>}
      <CommentBox toggle={toggle} isOpenModal={isOpenModal} comments={comments} setComments={setComments}  />
    </div>
  )
}

export default PostList;