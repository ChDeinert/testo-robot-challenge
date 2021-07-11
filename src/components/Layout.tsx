import React from 'react';
import './Layout.css';

const Layout : React.FC = ({ children }) => (
  <main>
    {children}
  </main>
);

export default Layout;