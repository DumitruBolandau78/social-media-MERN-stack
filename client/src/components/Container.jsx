// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <div className="container col-span-7 px-6 py-3 border-r-[1px] font-thin text-white border-gray-700">
      { children }
    </div>
  )
}

export default Container