import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../../pages/Layout';
import KeysListPage from '../../pages/KeysListPage';
import KeyPage from '../../pages/KeyPage';
import CreateKeyPage from '../../pages/CreateKeyPage';
import FaqPage from '../../pages/FaqPage';

import Spiner from '../Spiner/Spiner';

import { Store, User } from '../../types';

import './App.scss';

function App() {
  const { isAdmin } = useSelector<Store, User>((state) => state.user);

  return (
    <Suspense fallback={<Spiner />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {isAdmin ? (
              <>
                <Route index element={<Navigate to='/keys-list/' replace />} />
              </>
            ) : (
              <>
                <Route index element={<Navigate to='/keys-list/' replace />} />
              </>
            )}
            <Route path='/key/:id/' element={<KeyPage />} />
            <Route path='/keys-list/' element={<KeysListPage />} />
            <Route path='/create-key/' element={<CreateKeyPage />} />
            <Route path='/faq/' element={<FaqPage />} />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
