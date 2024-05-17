const SpanActive = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <p className='text-green text-md font-bold'>Active</p>
  ) : (
    <p className='text-red text-tg-theme-destructive-text text-md font-bold'>
      Inactive
    </p>
  );
};

export default SpanActive;
