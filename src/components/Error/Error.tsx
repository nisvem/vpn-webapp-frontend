import { Player } from '@lottiefiles/react-lottie-player';
import error from '../../data/errorAnimation.json';

const Error = ({ text }: { text: string }) => {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col py-4 px-5'>
      <div className='flex items-center justify-center flex-row gap-3 py-4 px-5 w-full rounded-lg bg-red-light'>
        <Player
          className='max-w-20 max-h-1/2'
          autoplay
          keepLastFrame
          src={error}
        ></Player>
        <p className='text-red text-sm w-full'>{text}</p>
      </div>
    </div>
  );
};
export default Error;
