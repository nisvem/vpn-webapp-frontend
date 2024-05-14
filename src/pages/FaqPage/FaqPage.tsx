import { useNavigate } from 'react-router-dom';
import Faq from '../../components/Faq/Faq';
import WebApp from '@twa-dev/sdk';

const FaqPage = () => {
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate('/');
  });

  return (
    <>
      <Faq />
      <button
        onClick={() => {
          navigate('/keys-list/');
        }}
        className='btn w-full my-5 mt-auto'
      >
        Keys List
      </button>
      <button
        onClick={() => {
          navigate('/create-key/');
        }}
        className='btn w-full'
      >
        Create Key
      </button>
    </>
  );
};

export default FaqPage;
