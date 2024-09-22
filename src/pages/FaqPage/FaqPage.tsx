import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WebApp from '@twa-dev/sdk';

import i18next from '../../lang';
import { Store, User } from '../../types';

import './FaqPage.scss';

const FaqPage = () => {
  const { lang } = useSelector<Store, User>((state) => state.user);
  const navigate = useNavigate();

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate('/');
  });

  return (
    <>
      <h1 className='title'>FAQ</h1>
      {lang === 'ru' ? faq_ru() : faq_en()}
      <button
        onClick={() => {
          navigate('/keys-list/');
        }}
        className='btn w-full my-5 mt-auto'
      >
        {i18next.t('keys_list')}
      </button>
      <button
        onClick={() => {
          navigate('/create-key/');
        }}
        className='btn w-full'
      >
        {i18next.t('add_key')}
      </button>
    </>
  );
};

function faq_ru() {
  return (
    <>
      <h2 className='faq__subtitle'>1. Как получить доступ к серверу?</h2>
      <div className='faq__block-text'>
        <ol>
          <li>
            <p>Скачайте и установите приложение Outline на ваше устройство:</p>
            <ul>
              <li>
                <span>– iOS: </span>
                <a
                  href='https://itunes.apple.com/app/outline-app/id1356177741'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://itunes.apple.com/app/outline-app/id1356177741
                </a>
              </li>
              <li>
                <span>– MacOS: </span>
                <a
                  href='https://itunes.apple.com/app/outline-app/id1356178125'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://itunes.apple.com/app/outline-app/id1356178125
                </a>
              </li>
              <li>
                <span>– Windows: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe
                </a>
              </li>
              <li>
                <span>– Linux: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage
                </a>
              </li>
              <li>
                <span>– Android: </span>
                <a
                  href='https://play.google.com/store/apps/details?id=org.outline.android.client'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://play.google.com/store/apps/details?id=org.outline.android.client
                </a>
              </li>
              <li>
                <span>- Альтернативная ссылка для Android: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk
                </a>
              </li>
            </ul>
          </li>
          <li>
            Вы получите ключ доступа, который начинается с ss://. Как только вы
            получите ключ, скопируйте его.
          </li>
          <li>
            Откройте приложение Outline. Если ваш ключ доступа автоматически
            определен, нажмите 'Подключить' и продолжайте. Если ваш ключ доступа
            не был автоматически определен, вставьте его в поле, затем нажмите
            'Подключить' и продолжайте. Вы готовы использовать открытый
            интернет! Чтобы убедиться, что вы успешно подключены к серверу,
            попробуйте выполнить поиск 'what is my IP' в Google. IP-адрес,
            отображаемый в Google, должен совпадать с IP-адресом в приложении
            Outline.
          </li>
        </ol>
      </div>
    </>
  );
}

function faq_en() {
  return (
    <>
      <h2 className='faq__subtitle'>1. How to get access to server?</h2>
      <div className='faq__block-text'>
        <ol>
          <li>
            <p>Download and install the Outline app for your device:</p>
            <ul>
              <li>
                <span>– iOS: </span>
                <a
                  href='https://itunes.apple.com/app/outline-app/id1356177741'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://itunes.apple.com/app/outline-app/id1356177741
                </a>
              </li>
              <li>
                <span>– MacOS: </span>
                <a
                  href='https://itunes.apple.com/app/outline-app/id1356178125'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://itunes.apple.com/app/outline-app/id1356178125
                </a>
              </li>
              <li>
                <span>– Windows: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe
                </a>
              </li>
              <li>
                <span>– Linux: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage
                </a>
              </li>
              <li>
                <span>– Android: </span>
                <a
                  href='https://play.google.com/store/apps/details?id=org.outline.android.client'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://play.google.com/store/apps/details?id=org.outline.android.client
                </a>
              </li>
              <li>
                <span>- Android alternative link: </span>
                <a
                  href='https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk
                </a>
              </li>
            </ul>
          </li>
          <li>
            You will receive an access key that starts with ss://. Once you
            receive the key, copy it.
          </li>
          <li>
            Open the Outline client app. If your access key is auto-detected,
            tap 'Connect' and proceed. If your access key is not auto-detected,
            paste it in the field, then tap 'Connect' and proceed. You're ready
            to use the Open Internet! To make sure that you've successfully
            connected to the server, try searching for 'what is my IP' on Google
            Search. The IP address shown in Google should match the IP address
            in the Outline client.
          </li>
        </ol>
      </div>
    </>
  );
}

export default FaqPage;
