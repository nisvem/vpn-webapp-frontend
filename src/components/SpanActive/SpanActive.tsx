import i18next from '../../lang';

const SpanActive = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <p className='text-green text-md font-bold'>{i18next.t('active')}</p>
  ) : (
    <p className='text-red text-tg-theme-destructive-text text-md font-bold'>
      {i18next.t('inactive')}
    </p>
  );
};

export default SpanActive;
