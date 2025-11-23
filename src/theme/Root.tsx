import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

interface RootProps {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>

      <div 
        className={`fixed top-0 left-0 h-1 bg-primary transition-all duration-300 ease-out z-[9999] ${
          isLoading ? 'w-full' : 'w-0'
        }`}
        style={{
          boxShadow: isLoading ? '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' : 'none'
        }}
      />

      <div key={location.pathname}>
        {children}
      </div>
    </>
  );
};

export default Root;