import React from 'react';
import {ReactComponent as Logo} from '../../../assets/Group 2.svg';
import {useAppSelector} from '../../../hooks/redux';
import {selectCurrentDragItem, selectDropAreaItems} from '../../../store/slices/calculatorSlice';
import CalculatorItemsList from '../../calculator-items/calculator-items-list';
import {useActions} from '../../../hooks/useActions';
import './drop-area.scss';

const DropArea: React.FC = () => {
  const dropAreaItems = useAppSelector(selectDropAreaItems);
  const currentDragItem = useAppSelector(selectCurrentDragItem);
  const {setSideBarItemDragProp, setDropAreaItem} = useActions();

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dropAreaItems.length) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over', 'empty');
    if (currentDragItem && !dropAreaItems.includes(currentDragItem)) {
      setSideBarItemDragProp({...currentDragItem, draggable: false});
      setDropAreaItem(currentDragItem);
    }
  };

  if (!dropAreaItems.length) {
    return (
      <div className={'drop-area empty'}
           onDrop={onDrop}
           onDragOver={onDragOver}
           onDragLeave={onDragLeave}
           onDragEnd={onDragEnd}
      >
        <div className="drop-area__tooltip">
          <Logo/>
          <p>
            <span>Перетащите сюда </span>
            любой элемент
            из левой панели
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="drop-area"
         onDrop={onDrop}
         onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDragEnd={onDragEnd}
    >
      <CalculatorItemsList items={dropAreaItems}/>
    </div>
  );
};

export default DropArea;