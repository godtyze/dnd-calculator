import React, {useCallback} from 'react';
import {ReactComponent as Eye} from '../../assets/eye.svg';
import {ReactComponent as Vector} from '../../assets/Vector.svg';
import Button from '../UI/button/button';
import './switch-mode.scss';
import {isConstructorMode} from '../../utils';
import {useAppSelector} from '../../hooks/redux';
import {selectMode} from '../../store/slices/calculatorSlice';
import {useActions} from '../../hooks/useActions';

const SwitchMode: React.FC = () => {
  const mode = useAppSelector(selectMode);
  const {setMode, setInitialState} = useActions();

  const onClickConstructor = useCallback(() => {
    setMode('constructor');
    setInitialState();
  }, []);

  const onClickRuntime = useCallback(() => {
    setMode('runtime');
  }, []);

  return (
    <div className='switch-mode'>
      <Button
        className={isConstructorMode(mode) ? 'switch-mode__btn' : 'switch-mode__btn active'}
        onClick={onClickRuntime}
      >
        <Eye/>
        <span>Runtime</span>
      </Button>
      <Button
        className={isConstructorMode(mode) ? 'switch-mode__btn active' : 'switch-mode__btn'}
        onClick={onClickConstructor}
      >
        <Vector/>
        <span>Constructor</span>
      </Button>
    </div>
  );
};

export default SwitchMode;