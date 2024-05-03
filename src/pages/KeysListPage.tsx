import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';

import Spiner from '../components/Spiner/Spiner';
import Error from '../components/Error/Error';
import KeysList from '../components/KeysList/KeysList';

import { Key, Store, User } from '../types';

const KeysListPage = () => {
  const { isAdmin, isLimitedToCreate, maxKeyAvalible, keys } = useSelector<
    Store,
    User
  >((state) => state.user);
  const [keysData, setKeysData] = useState<Key[]>([]);
  const { request, process, loading, errorText } = useHttp();

  const navigate = useNavigate();

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList() {
    if (isAdmin) {
      request('/api/getAllKeys').then((response) => setKeysData(response));
    } else {
      request('/api/getKeys').then((response) => setKeysData(response));
    }
  }

  return (
    <>
      <h1 className='title'>Keys List</h1>
      {process === 'error' ? (
        <Error text={errorText}></Error>
      ) : loading ? (
        <Spiner />
      ) : (
        <KeysList keys={keysData} />
      )}
      <p className='text-red mt-auto mb-4 text-sm text-center w-full'>{`You have ${keys.length} of ${maxKeyAvalible} avalible keys.`}</p>
      <button
        onClick={() => {
          navigate('/create-key/');
        }}
        className='btn w-full'
        disabled={
          process === 'error' || loading
            ? true
            : isLimitedToCreate
            ? true
            : false
        }
      >
        Add
      </button>
    </>
  );
};

export default KeysListPage;
