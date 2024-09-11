
// eslint-disable-next-line react/prop-types
const FollowUser = ({ urlAvatar, name, username }) => {
  return (
    <div className='flex justify-between'>
      <div>
        <div className="avatar"><img src={urlAvatar} alt="" /></div>
        <div>
          <div className="name">{name}</div>
          <div className="username">{username}</div>
        </div>
      </div>
      <div><button>Follow</button></div>
    </div>
  )
}

export default FollowUser