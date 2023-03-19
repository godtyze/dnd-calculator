import React from 'react';
import {ICalculatorItem} from '../../models';
import Result from './result';
import Operations from './operations';
import Numbers from './numbers';
import Equals from './equals';
import {useActions} from '../../hooks/useActions';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentDragItem, selectDropAreaItems, selectMode} from '../../store/slices/calculatorSlice';
import {isConstructorMode} from '../../utils';

interface CalculatorItemsListProps {
  items: ICalculatorItem[]
}

const CalculatorItemsList: React.FC<CalculatorItemsListProps> = ({items}) => {
  const dropAreaItems = useAppSelector(selectDropAreaItems);
  const currentDragItem = useAppSelector(selectCurrentDragItem);
  const mode = useAppSelector(selectMode);
  const {setCurrentDragItem, removeDropAreaItem, setSideBarItemDragProp, setDropAreaItemOnDrop} = useActions();

  const onDragStart = (item: ICalculatorItem) => {
    setCurrentDragItem(item);
    setSideBarItemDragProp({...item, draggable: false});
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>, item: ICalculatorItem) => {
    setCurrentDragItem(null);
    e.currentTarget.classList.remove('drag-over');
    const index = dropAreaItems.findIndex(el => el.name === item.name);
    if (index === -1) {
      setSideBarItemDragProp({...item, draggable: true});
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.preventDefault();
    if (currentDragItem) {
      const currentIndex = dropAreaItems.findIndex(el => el.name === currentDragItem.name);

      if (currentIndex >= idx) {
        e.currentTarget.classList.add('drag-over-top');
      } else {
        e.currentTarget.classList.add('drag-over-bottom');
      }
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over-top', 'drag-over-bottom');
  };

  const onDoubleClick = (item: ICalculatorItem) => {
    removeDropAreaItem(item);
    setSideBarItemDragProp({...item, draggable: true});
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, item: ICalculatorItem) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over-top', 'drag-over-bottom');
    const currentIndex = dropAreaItems.findIndex(item => item.name === currentDragItem!.name);
    const dropIndex = dropAreaItems.findIndex(el => el.name === item.name);
    setDropAreaItemOnDrop({currentIndex, dropIndex});
  };

  return (
    <>
      {items.map((item, idx) => {
        switch (item.name) {
          case 'result':
            return <Result
              item={item}
              key={item.name}
              draggable={isConstructorMode(mode) ? item.draggable : undefined}
              onDragStart={isConstructorMode(mode) ? onDragStart : undefined}
              onDoubleClick={item.draggable && dropAreaItems.includes(item) && isConstructorMode(mode)
                ? onDoubleClick : undefined}
              onDragEnd={isConstructorMode(mode) ? onDragEnd : undefined}
              onDrop={isConstructorMode(mode) ? onDrop : undefined}
              onDragLeave={isConstructorMode(mode) ? onDragLeave : undefined}
              onDragOver={isConstructorMode(mode) ? (e) => onDragOver(e, idx) : undefined}
              className={dropAreaItems.includes(item) && isConstructorMode(mode)
                ? 'result dropped' : 'result'}
            />
          case 'operations':
            return <Operations
              item={item}
              key={item.name}
              draggable={isConstructorMode(mode) ? item.draggable : undefined}
              onDragStart={isConstructorMode(mode) ? onDragStart : undefined}
              onDoubleClick={item.draggable && dropAreaItems.includes(item) && isConstructorMode(mode)
                ? onDoubleClick : undefined}
              onDragEnd={isConstructorMode(mode) ? onDragEnd : undefined}
              onDrop={isConstructorMode(mode) ? onDrop : undefined}
              onDragLeave={isConstructorMode(mode) ? onDragLeave : undefined}
              onDragOver={isConstructorMode(mode) ? (e) => onDragOver(e, idx) : undefined}
              className={dropAreaItems.includes(item) && isConstructorMode(mode)
                ? 'operations dropped' : 'operations'}
            />
          case 'numbers':
            return <Numbers
              item={item}
              key={item.name}
              draggable={isConstructorMode(mode) ? item.draggable : undefined}
              onDragStart={isConstructorMode(mode) ? onDragStart : undefined}
              onDoubleClick={item.draggable && dropAreaItems.includes(item) && isConstructorMode(mode)
                ? onDoubleClick : undefined}
              onDragEnd={isConstructorMode(mode) ? onDragEnd : undefined}
              onDrop={isConstructorMode(mode) ? onDrop : undefined}
              onDragLeave={isConstructorMode(mode) ? onDragLeave : undefined}
              onDragOver={isConstructorMode(mode) ? (e) => onDragOver(e, idx) : undefined}
              className={dropAreaItems.includes(item) && isConstructorMode(mode)
                ? 'numbers dropped' : 'numbers'}
            />
          case 'equals':
            return <Equals
              item={item}
              key={item.name}
              draggable={isConstructorMode(mode) ? item.draggable : undefined}
              onDragStart={isConstructorMode(mode) ? onDragStart : undefined}
              onDoubleClick={item.draggable && dropAreaItems.includes(item) && isConstructorMode(mode)
                ? onDoubleClick : undefined}
              onDragEnd={isConstructorMode(mode) ? onDragEnd : undefined}
              onDrop={isConstructorMode(mode) ? onDrop : undefined}
              onDragLeave={isConstructorMode(mode) ? onDragLeave : undefined}
              onDragOver={isConstructorMode(mode) ? (e) => onDragOver(e, idx) : undefined}
              className={dropAreaItems.includes(item) && isConstructorMode(mode)
                ? 'equals dropped' : 'equals'}
            />
        }
      })}
    </>
  );
};

export default CalculatorItemsList;