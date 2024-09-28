import FollowUserList from "./Follow/FollowUserList"

const RightSide = () => {
  return (
    <div className='right-side col-span-3 px-6 py-3 font-thin text-white'>
      <h2 className="font-medium text-xl">You might like</h2>
      <FollowUserList />
    </div>
  )
}

export default RightSide