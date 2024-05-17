import { Children } from 'react';
import { useSelector } from 'react-redux';
import { Store, User } from '../../types';

import './KeyInfoTable.scss';

export const InfoRow = ({
  name,
  children,
  onlyAdmin = false,
}: {
  name: string;
  children: JSX.Element;
  onlyAdmin: boolean;
}) => {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  return onlyAdmin === isAdmin || isAdmin ? (
    <div className='table__row'>
      <div className='table__name'>{name}</div>
      <div className='table__description'>
        {Children.map(children, (child) => {
          return child;
        })}
      </div>
    </div>
  ) : null;
};

export const InfoTable = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`table ${className}`}>
      {Children.map(children, (child) => {
        return <>{child}</>;
      })}
    </div>
  );
};
