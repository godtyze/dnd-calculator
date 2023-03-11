import React from 'react';
import Sidebar from './sidebar/sidebar';
import DropArea from './drop-area/drop-area';
import './constructor.scss';

const Constructor: React.FC = () => {
  return (
    <div className='constructor'>
      <Sidebar/>
      <DropArea/>
    </div>
  );
};

export default Constructor;