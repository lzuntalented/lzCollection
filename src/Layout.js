import React from 'react';
import Navlabel from './Navlabel';

export default function Layout({ children }) {
  return (
    <div>
      <h1>Hello, world!</h1>
      {children}
      <Navlabel>xinxd</Navlabel>
    </div>
  )
}
