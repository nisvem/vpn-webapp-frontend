import { useEffect, useState } from 'react';

import { useHttp } from '../../hooks/http.hook';

import { User } from '../../types';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';

const UsersList = () => {
  const [list, setList] = useState<User[]>([]);
  const { request, process, errorText } = useHttp();

  useEffect(() => {
    request('/api/getUsers').then((response) => setList(response));
  }, []);

  switch (process) {
    case 'error':
      return <Error text={errorText}></Error>;
    case 'success':
      return list.length > 0 ? (
        list.map((item, i) => <p key={i}>{item.username}</p>)
      ) : (
        <p>Нет никого</p>
      );

    default:
      return <Spiner />;
  }
};

export default UsersList;
