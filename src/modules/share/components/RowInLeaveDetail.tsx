const RowInLeaveDetail = ({ name, component }) => {
  return (
    <div className='flex justify-start'>
      <p className='min-w-[200px] typography-label-lg font-semibold text-gray-800'>{name}</p>
      <div>{component}</div>
    </div>
  )
}

export default RowInLeaveDetail
