const SpanActive = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <p className='text-green text-xs font-bold'>Active</p>
  ) : (
    <p className='text-red text-xs font-bold'>Inactive</p>
  );
};

export default SpanActive;
