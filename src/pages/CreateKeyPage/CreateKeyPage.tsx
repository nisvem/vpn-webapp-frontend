import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import CreateKey from '../../components/CreateKey/CreateKey';

const CreateKeyPage = () => {
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate('/');
  });

  return (
    <>
      <h1 className='title'>Create Key</h1>
      <CreateKey />
    </>
  );
};

export default CreateKeyPage;
