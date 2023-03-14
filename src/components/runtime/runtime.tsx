import React from 'react';
import {useAppSelector} from '../../hooks/redux';
import {selectDropAreaItems} from '../../store/slices/calculatorSlice';
import CalculatorItemsList from '../calculator-items/calculator-items-list';
import './runtime.scss';

const Runtime: React.FC = () => {
  const dropAreaItems = useAppSelector(selectDropAreaItems);

  return (
    <div className='runtime'>
      <CalculatorItemsList items={dropAreaItems}/>
    </div>
  );
};

export default Runtime;