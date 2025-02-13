import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Active, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { useMemo, useState } from 'react';
import { ReactNode } from 'react';
import { DragHandle, SortableItem } from '../SortableItem/SortableItem';
import { SortableOverlay } from '../SortableOverlay/SortableOverlay';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[] | undefined;
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

export const SortableList = <T extends BaseItem>({ items = [], onChange, renderItem }: Props<T>): ReactNode => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => {
    return items.find(item => {
      return item.id === active?.id;
    });
  }, [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => {
            return id === active.id;
          });
          const overIndex = items.findIndex(({ id }) => {
            return id === over.id;
          });

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <div>
          {items.map(item => {
            return <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>;
          })}
        </div>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  );
};

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
