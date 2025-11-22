import React from 'react';
import { useLocation } from '@docusaurus/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Root = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup className="page-transition-container">
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames={{
          enter: 'page-transition-enter',
          enterActive: 'page-transition-enter-active',
          exit: 'page-transition-exit',
          exitActive: 'page-transition-exit-active',
        }}
      >
        <div className="page-transition-content">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Root;