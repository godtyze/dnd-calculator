import {useAppDispatch} from './redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {actionCreators} from '../store/actions';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionCreators, dispatch);
};