import { Outlet } from 'react-router-dom';
import Header from './Header';

import './Layout.css';

const Layout = ({ children, title, ...props }) => (
  <div className="layout">
    <Header className="layout-header bordered" {...props} />
    <main className="layout-main bordered">
      <Outlet />
    </main>
    <footer className="layout-footer bordered">© 2022 Keepcoding</footer>
  </div>
);

export default Layout;
