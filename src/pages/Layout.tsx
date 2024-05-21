import { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Header from '../components/Header/Header';

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
  const location = useLocation();
  const currentOutlet = useOutlet();
  const nodeRef = useRef(null);

  return (
    <div className='max-w-xl mx-auto w-full flex flex-col items-start flex-1 relative'>
      <Header />

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          classNames='page'
          timeout={300}
          nodeRef={nodeRef}
        >
          {() => (
            <div
              className=' p-3 w-full flex flex-col items-start flex-1 relative'
              ref={nodeRef}
            >
              <ScrollToTop />
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Layout;
