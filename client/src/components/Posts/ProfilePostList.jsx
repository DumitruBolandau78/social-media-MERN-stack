import { useEffect, useState } from 'react'
import { domain } from '../../utils/variables';
import ProfilePost from './ProfilePost';

const ProfilePostList = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(domain + `/api/getCurrentUserPosts?page=${page}`, { credentials: 'include' });
    const data = await response.json();
    if(data){
      setPosts(prevPosts => [...prevPosts, ...data.posts]);
      setPage(prevPage => prevPage + 1);
    }
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
    <div className='mt-7 flex flex-col items-center'>
      { posts.map(post => <ProfilePost key={'profile-post-' + post._id} {...post} />)}
    </div>
  )
}

export default ProfilePostList