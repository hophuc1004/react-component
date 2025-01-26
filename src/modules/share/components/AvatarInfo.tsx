import classNames from 'classnames'
import Avatar from 'components/Avatar'
import NoneValue from 'components/NoneValue'
import Typography, { TypographyProps } from 'components/Typography'
import { ReactNode } from 'react'

const AvatarInfo = ({
  name,
  url,
  textClass,
  size,
  customText,
  avatarCustomText
}: {
  name: string
  url?: string
  textClass?: string
  size?: TypographyProps['size']
  customText?: ReactNode
  avatarCustomText?: string
}) => {
  return (
    <NoneValue value={url || name}>
      <div className='flex items-center gap-2'>
        <Avatar size='sm' name={name} src={url} className={classNames('`min-w-6 text-[12px]', avatarCustomText)} />

        {customText ? (
          customText
        ) : (
          <Typography
            variants='body'
            size={size || 'medium'}
            className={classNames('text-gray-800 truncate', textClass)}
          >
            {name}
          </Typography>
        )}
      </div>
    </NoneValue>
  )
}

export default AvatarInfo
