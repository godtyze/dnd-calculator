import React from 'react';
import {ReactComponent as Eye} from '../../assets/eye.svg';
import {ReactComponent as Vector} from '../../assets/Vector.svg';
import Button from '../UI/button/button';
import {isConstructorMode} from '../../utils';
import {useAppSelector} from '../../hooks/redux';
import {selectMode} from '../../store/slices/calculatorSlice';
import {useActions} from '../../hooks/useActions';
import './switch-mode.scss';

const SwitchMode: React.FC = () => {
  const mode = useAppSelector(selectMode);
  const {setMode, setInitialState} = useActions();

  const onClickConstructor = () => {
    if (isConstructorMode(mode)) return;

    setMode('constructor');
    setInitialState();
  };

  const onClickRuntime = () => {
    if (!isConstructorMode(mode)) return;

    setMode('runtime');
  };

  return (
    <div className='switch-mode'>
      <Button
        className={isConstructorMode(mode) ? 'switch-mode__btn' : 'switch-mode__btn active'}
        onClick={onClickRuntime}
      >
        <Eye className={isConstructorMode(mode) ? '' : 'active'}/>
        <span>Runtime</span>
      </Button>
      <Button
        className={isConstructorMode(mode) ? 'switch-mode__btn active' : 'switch-mode__btn'}
        onClick={onClickConstructor}
      >
        <Vector className={isConstructorMode(mode) ? 'active' : ''}/>
        <span>Constructor</span>
      </Button>
    </div>
  );
};

export default SwitchMode;