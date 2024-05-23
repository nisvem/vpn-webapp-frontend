import { useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import i18next from '../lang';

import Header from '../components/Header/Header';

import { Store, User } from '../types';

function ScrollToTop() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTo(0, 0);
    }
  }, []);

  return null;
}

const Layout = () => {
  const { lang } = useSelector<Store, User>((state) => state.user);
  const [inShow, setInShow] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet();
  const nodeRef = useRef(null);

  useEffect(() => {
    setInShow(true);
    i18next.changeLanguage(lang || 'en');
  }, []);

  return (
    <>
      <CSSTransition
        timeout={300}
        in={inShow}
        nodeRef={nodeRef}
        classNames='page'
      >
        {() => <Header />}
      </CSSTransition>

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          classNames='page'
          timeout={300}
          nodeRef={nodeRef}
        >
          {() => (
            <div className='layout-page' ref={nodeRef}>
              <ScrollToTop />
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Layout;
