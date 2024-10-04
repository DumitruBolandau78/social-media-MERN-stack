import Container from '../components/Container';
import StorieList from '../components/Stories/StorieList';
import Modal from '../components/Modal';
import { useContext, useState } from 'react';
import PostFeedList from '../components/Posts/PostFeedList';
import { UserContext } from '../context/UserContext';

const Feed = () => {
  const { user } = useContext(UserContext);
  const [isOpenModal, toggle] = useState();
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState();
  const [notification, setNotification] = useState('');
  const [posts, setPosts] = useState([]);

  function handlOpenModal(bool) {
    toggle(bool);
  }

  async function postHandler(e) {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append('file', file)
    dataForm.append('desc', desc)

    await fetch(process.env.DOMAIN + '/api/post', {
      method: 'POST',
      credentials: 'include',
      body: dataForm
    })
      .then(res => res.json())
      .then(data => {
        if (data.posts) setPosts(data.posts);
        setDesc('');
        setNotification('');
        handlOpenModal(false);
      })
      .catch(err => console.error(err));
  }

  return (
    <Container>
      <StorieList />
      <div onClick={() => user? handlOpenModal(true) : alert('Please login to post.')} className='flex gap-3 bg-white py-2 px-4 rounded-md mt-5'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
        <div className='w-full text-gray-900 font-medium self-center cursor-text'>Write a post!</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer bg-gray-900 p-2 text-white rounded-full size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <Modal isOpenModal={isOpenModal} handleClose={() => handlOpenModal(false)}>
        <form onSubmit={postHandler} className='flex flex-col min-w-[500px] w-full'>
          <p className='text-red-600 font-normal text-sm'>Write a message*</p>
          <textarea required maxLength={500} className='w-full h-24 shadow-lg my-3 resize-none py-2 px-4 text-gray-900' value={desc} onChange={e => setDesc(e.target.value)} placeholder='Your message...' name="desc" id=""></textarea>
          <p className='text-red-600 font-normal mb-2 text-sm'>Uploading an image is required*</p>
          {notification && (<p className='text-red-600 font-normal mb-2 text-2xl'>{notification}</p>)}
          <label htmlFor="imgPost" className='shadow-md py-16 flex justify-center gap-5'>
            <input onChange={(e) => { setNotification('File uploaded!'); setFile(e.target.files[0]) }} required type="file" name="imgPost" id="imgPost" className='hidden' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer bg-white text-gray-900 size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <p className='text-gray-900 text-2xl font-medium'>upload image</p>
          </label>
          <div className='flex justify-center'><button className='bg-gray-900 mt-4 text-2xl py-2 px-8 rounded-md font-normal'>POST</button></div>
        </form>
      </Modal>
      <PostFeedList posts={posts} setPosts={setPosts} />
    </Container>
  )
}

export default Feed;