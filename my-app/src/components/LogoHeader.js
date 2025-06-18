import React from 'react';
import './LogoHeader.css';
import AuthStatus from './AuthStatus';

function LogoHeader() {
  return (
    <div className="logo-header">
      <span>Refuture</span>
      <AuthStatus />
    </div>
  );
}

export default LogoHeader;