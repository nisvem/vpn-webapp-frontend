import { Children } from 'react';
import { useSelector } from 'react-redux';
import { Store, User } from '../../types';

import './KeyInfoTable.scss';

export const KeyInfoRow = ({
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
    <div className='key-table__row'>
      <div className='key-table__name'>{name}</div>
      <div className='key-table__description'>
        {Children.map(children, (child) => {
          return child;
        })}
      </div>
    </div>
  ) : null;
};

export const KeyInfoTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='key-table'>
      {Children.map(children, (child) => {
        return <>{child}</>;
      })}
    </div>
  );
};
