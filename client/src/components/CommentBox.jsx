import Modal from './Modal'
import { useRef, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { domain } from '../utils/variables';
import Comment from './Comment';

// eslint-disable-next-line react/prop-types
const CommentBox = ({ toggle, isOpenModal, comments, setComments }) => {
  const { postID } = useContext(UserContext);
  const commentContainer = useRef();
  const [commentValue, setComentvalue] = useState('');

  function handlOpenModal(bool) {
    toggle(bool);
  }

  useEffect(() => {
    if (commentContainer.current) {
      commentContainer.current.scrollTop = commentContainer.current.scrollHeight;
    }
  }, [comments]);

  async function postCommentHandler() {
    await fetch(domain + `/api/postComment`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ postID: postID, comment: commentValue })
    })
      .then(res => res.json())
      .then(data => {
        if (data.comments) {
          setComments(data.comments);
          setComentvalue('');
        }
      }).catch(err => console.log(err)
      );
  }

  return (
    <Modal isOpenModal={isOpenModal} handleClose={() => handlOpenModal(false)}>
      <div className='min-w-[700px] max-w-[700px] text-gray-900 h-[65vh] min-h-[65vh]'>
        <h2 className="font-medium text-center text-xl ">Comments</h2>
        <div ref={commentContainer} className='mt-3 border-l-[1px] border-gray-900 pl-4 overflow-auto' style={{ height: 'calc(65vh - 100px)' }}>
          {comments.length ? comments.map(com => <Comment key={com._id} username={com.user.username} {...com} nameOfUser={com.user.name} avatarUrl={com.user.avatarUrl} />) : <div className='text-center font-medium'>No comments yet.</div>}
        </div>
        <div className='flex gap-5 absolute bottom-0 left-0 right-0'>
          <input value={commentValue} onChange={(e) => setComentvalue(e.target.value)} placeholder='Write a comment...' type="text" className='w-full px-3 py-2 rounded-md' style={{ border: '1px solid #212121' }} />
          <button onClick={postCommentHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CommentBox