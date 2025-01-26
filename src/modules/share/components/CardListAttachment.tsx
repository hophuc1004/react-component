import isEmpty from 'lodash/isEmpty'
import { FC } from 'react'
import { AttachmentItem } from '.'

interface CardListAttachmentProps {
  attachments?: any
}

const CardListAttachment: FC<CardListAttachmentProps> = ({ attachments }) => {
  if (isEmpty(attachments)) {
    return
  }

  return attachments?.map((att, index) => {
    return <AttachmentItem key={`${att?.originName}-${index}`} s3Url={att?.s3Url} originName={att?.originName} />
  })
}

export default CardListAttachment
