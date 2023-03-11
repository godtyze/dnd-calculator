import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {CalculatorState, ICalculatorItem, Mode, OperationType} from '../../models';

const initialState: CalculatorState= {
  sideBarItems: [
    {name: 'result', draggable: true},
    {name: 'operations', draggable: true},
    {name: 'numbers', draggable: true},
    {name: 'equals', draggable: true},
  ],
  dropAreaItems: [],
  mode: 'constructor',
  currentDragItem: null,
  operation: '',
  leftOperand: '',
  rightOperand: '',
  output: 0
};

const calculatorSlice = createSlice({
  name: 'calculatorSlice',
  initialState,
  reducers: {
    setSideBarItemDragProp: (state, action: PayloadAction<ICalculatorItem>) => {
      const index = state.sideBarItems.findIndex(item => item.name === action.payload.name);
      state.sideBarItems[index].draggable = action.payload.draggable;
    },
    setDropAreaItem: (state, action: PayloadAction<ICalculatorItem>) => {
      if (action.payload.name === 'result') {
        state.dropAreaItems.unshift(action.payload);
      } else {
        state.dropAreaItems.push(action.payload);
      }
    },
    setDropAreaItemOnDrop: (state, action: PayloadAction<{ currentIndex: number, dropIndex: number }>) => {
      if (action.payload.currentIndex === action.payload.dropIndex) return;
      if (state.currentDragItem!.name === 'result' && !(state.dropAreaItems[0].name === 'result')) {
        state.dropAreaItems.unshift(state.currentDragItem!);
        return;
      }
      if (state.dropAreaItems[action.payload.dropIndex].name === 'result') {
        return;
      }

      if (action.payload.currentIndex === -1) {
        state.dropAreaItems.splice(action.payload.dropIndex, 0, state.currentDragItem!);
      } else {
        state.dropAreaItems.splice(action.payload.currentIndex, 1, state.dropAreaItems[action.payload.dropIndex]);
        state.dropAreaItems.splice(action.payload.dropIndex, 1, state.currentDragItem!);
      }
    },
    removeDropAreaItem: (state, action: PayloadAction<ICalculatorItem>) => {
      const index = state.dropAreaItems.findIndex(item => item.name === action.payload.name);
      state.dropAreaItems.splice(index, 1);
    },
    setCurrentDragItem: (state, action: PayloadAction<ICalculatorItem | null>) => {
      state.currentDragItem = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    setLeftOperand: (state, action: PayloadAction<number | string>) => {
      state.leftOperand += action.payload;
    },
    setRightOperand: (state, action: PayloadAction<number | string>) => {
      state.rightOperand += action.payload;
    },
    setOperation: (state, action: PayloadAction<OperationType>) => {
      state.operation = action.payload;
    },
    setOutput: (state, action: PayloadAction<number | string>) => {
      state.output = action.payload;
      state.operation = '';
      state.leftOperand = '';
      state.rightOperand = '';
    },
    setInitialState: (state) => {
      state.operation = '';
      state.leftOperand = '';
      state.rightOperand = '';
      state.output = 0;
      state.dropAreaItems = [];
      state.sideBarItems = [
        {name: 'result', draggable: true},
        {name: 'operations', draggable: true},
        {name: 'numbers', draggable: true},
        {name: 'equals', draggable: true},
      ]
    }
  }
});


export const calculatorActions = calculatorSlice.actions;
export default calculatorSlice.reducer;

export const selectSideBarItems = (state: RootState) => state.calculatorReducer.sideBarItems;
export const selectDropAreaItems = (state: RootState) => state.calculatorReducer.dropAreaItems;
export const selectCurrentDragItem = (state: RootState) => state.calculatorReducer.currentDragItem;
export const selectMode = (state: RootState) => state.calculatorReducer.mode;
export const selectLeftOperand = (state: RootState) => state.calculatorReducer.leftOperand;
export const selectRightOperand = (state: RootState) => state.calculatorReducer.rightOperand;
export const selectOperation = (state: RootState) => state.calculatorReducer.operation;
export const selectOutput = (state: RootState) => state.calculatorReducer.output;
