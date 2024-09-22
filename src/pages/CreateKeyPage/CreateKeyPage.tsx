import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import CreateKey from '../../components/CreateKey/CreateKey';
import i18next from '../../lang';

const CreateKeyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => {
      navigate('/');
    });
  });

  return (
    <>
      <h1 className='title'>{i18next.t('create_key_title')}</h1>
      <CreateKey />
    </>
  );
};

export default CreateKeyPage;
