import Storie from './Storie';

const StorieList = () => {
  return (
    <div className='flex gap-2'>
      <Storie>
        <div className='flex items-center justify-center w-full h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </Storie>

    </div >
  )
}

export default StorieList