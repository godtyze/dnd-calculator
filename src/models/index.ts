import React from 'react';
import {operations} from '../constants';

export interface ICalculatorItem {
  name: 'result' | 'operations' | 'numbers' | 'equals';
  draggable: boolean;
}

export interface CalculatorState {
  sideBarItems: ICalculatorItem[];
  dropAreaItems: ICalculatorItem[];
  mode: Mode;
  currentDragItem: ICalculatorItem | null;
  operation: OperationType;
  leftOperand: string;
  rightOperand: string;
  output: number | string;
}

export interface CalculatorItemProps {
  item: ICalculatorItem
  draggable?: boolean;
  onDragStart?: (item: ICalculatorItem) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>, item: ICalculatorItem) => void;
  onDoubleClick?: (item: ICalculatorItem) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, item: ICalculatorItem) => void;
  className: string;
}

export type Mode = 'constructor' | 'runtime';
export type OperationType = typeof operations[keyof typeof operations] | '';