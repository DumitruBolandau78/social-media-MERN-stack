import { useEffect, useRef, useState } from 'react'
import PostFeed from './PostFeed';
import CommentBox from '../CommentBox';

const ProfileSavedPostsList = () => {
  const [page, setPage] = useState(1);
  const [currentUserSavedPosts, setCurrentUserSavedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [isOpenModal, toggle] = useState(false);
  
  const fetchPosts = async () => {
    const response = await fetch(process.env.DOMAIN + `/api/getCurrentUserSavedPosts?page=${page}`, { credentials: 'include' });
    const data = await response.json();
    
    if(data){
      if (data.length === 0) {
        setHasMore(false);
      } else if(data.length > 0 && data.length < 5){
        setHasMore(false);
        setCurrentUserSavedPosts(prevPosts => [...prevPosts, ...data]);
        setPage(prevPage => prevPage + 1);
      } else {
        setCurrentUserSavedPosts(prevPosts => [...prevPosts, ...data]);
        setPage(prevPage => prevPage + 1);
      }
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
  }, [currentUserSavedPosts]);

  function handlOpenModal(bool) {
    toggle(bool);
  }

  return (
    <div className='mt-7 flex flex-col items-center'>
      { currentUserSavedPosts.map(post => <PostFeed userID={post.user._id} setComments={setComments} handlOpenModal={handlOpenModal} key={'post-feed-' + post._id} {...post} username={post.user.username} name={post.user.name} avatarUrl={post.user.avatarUrl} />)}
      {hasMore? <div className='text-center' ref={lastElem}>Uploading posts...</div> : <div className='text-center font-medium'>No more posts!</div>}
      <CommentBox toggle={toggle} isOpenModal={isOpenModal} comments={comments} setComments={setComments}  />
    </div>
  )
}

export default ProfileSavedPostsList;