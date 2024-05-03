import { Player } from '@lottiefiles/react-lottie-player';
import done from '../../data/doneAnimation.json';

const Done = ({ text }: { text: string }) => {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center flex-row gap-3 py-4 px-5 w-full rounded-lg bg-green-light'>
        <Player
          className='max-w-20 max-h-1/2'
          autoplay
          keepLastFrame
          src={done}
        ></Player>
        <p className='text-green text-sm w-full'>{text}</p>
      </div>
    </div>
  );
};
export default Done;
