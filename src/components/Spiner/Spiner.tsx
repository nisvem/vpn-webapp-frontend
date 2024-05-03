import { Player } from '@lottiefiles/react-lottie-player';
import spiner from '../../data/spinerAnimation.json';

import './Spiner.scss';

const Spiner = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <Player className='spiner' autoplay loop src={spiner}></Player>
    </div>
  );
};
export default Spiner;
