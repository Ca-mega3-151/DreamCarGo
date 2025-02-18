import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createContext, useContext, useMemo } from 'react';
import { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';
import { Button } from '../../../../Button';
import { Drag } from '../icons/Drag';
import './styles.css';

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref: () => {
    return undefined;
  },
});

export const SortableItem = ({ children, id }: PropsWithChildren<Props>): ReactNode => {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
  });
  const context = useMemo(() => {
    return {
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    };
  }, [attributes, listeners, setActivatorNodeRef]);
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div className="AntTableColumnsConfig__SortableItem" ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
};

export const DragHandle: FC = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <div {...attributes} {...listeners} ref={ref}>
      <Button size="small" type="text" icon={<Drag />} />
    </div>
  );
};
