import React from 'react';
import Constructor from './constructor/constructor';
import {useAppSelector} from '../hooks/redux';
import {selectMode} from '../store/slices/calculatorSlice';
import {isConstructorMode} from '../utils';
import Runtime from './runtime/runtime';
import SwitchMode from './switch-mode/switch-mode';

const Workflow: React.FC = () => {
  const mode = useAppSelector(selectMode);
  return (
    <div className='wrapper'>
      <SwitchMode/>
      {isConstructorMode(mode)
        ? <Constructor/>
        : <Runtime/>
      }
    </div>
  );
};

export default Workflow;