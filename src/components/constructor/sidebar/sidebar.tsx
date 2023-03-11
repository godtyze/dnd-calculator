import React from 'react';
import {useAppSelector} from '../../../hooks/redux';
import {selectSideBarItems} from '../../../store/slices/calculatorSlice';
import CalculatorItemsList from '../../calculator-items/calculator-items-list';
import './sidebar.scss';

const Sidebar: React.FC = () => {
  const sideBarItems = useAppSelector(selectSideBarItems);

  return (
    <div className='side-bar'>
      <CalculatorItemsList items={sideBarItems}/>
    </div>
  );
};

export default Sidebar;