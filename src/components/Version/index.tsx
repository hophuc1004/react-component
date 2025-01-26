import Typography from 'components/Typography'

const Version = () => {
  return (
    <div className='fixed right-2 bottom-2 z-[10000]'>
      <Typography className='text-gray-700'>{__APP_VERSION__}</Typography>
    </div>
  )
}

export default Version
