import { IPlayerProps, Player } from '@lottiefiles/react-lottie-player'
import loadingData from './hrm-loading.json'
import { FC } from 'react'

interface LoadingProps extends Omit<IPlayerProps, 'src'> {
  width?: number
  height?: number
}

export const Loading: FC<LoadingProps> = ({ width = 80, height = 80, ...rest }) => {
  return <Player autoplay loop src={loadingData} style={{ height, width }} {...rest} />
}
