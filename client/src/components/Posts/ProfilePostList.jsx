import { useEffect, useRef, useState } from 'react'
import { domain } from '../../utils/variables';
import ProfilePost from './ProfilePost';

const ProfilePostList = () => {
  const [page, setPage] = useState(1);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const response = await fetch(domain + `/api/getCurrentUserPosts?page=${page}`, { credentials: 'include' });
    const data = await response.json();

    if (data.posts.length === 0) {
      setHasMore(false);
    } else if(data.posts.length > 0 && data.posts.length < 5){
      setHasMore(false);
      setCurrentUserPosts(prevPosts => [...prevPosts, ...data.posts]);
      setPage(prevPage => prevPage + 1);
    } else {
      setCurrentUserPosts(prevPosts => [...prevPosts, ...data.posts]);
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
  }, [currentUserPosts]);

  return (
    <div className='mt-7 flex flex-col items-center'>
      {currentUserPosts.map(post => <ProfilePost key={'profile-post-' + post._id} {...post} />)}
      {hasMore? <div className='text-center' ref={lastElem}>Uploading posts...</div> : <div className='text-center font-medium' ref={lastElem}>No more posts!</div>}
    </div>
  )
}

export default ProfilePostList