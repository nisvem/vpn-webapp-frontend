const SpanActive = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <span className='text-green text-xs font-bold'>Active</span>
  ) : (
    <span className='text-red text-xs font-bold'>Inactive</span>
  );
};

export default SpanActive;
