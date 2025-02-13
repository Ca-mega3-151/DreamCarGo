import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { DropAnimation } from '@dnd-kit/core';
import { FC, PropsWithChildren } from 'react';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

interface Props {}

export const SortableOverlay: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>;
};
