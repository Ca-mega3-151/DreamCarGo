import { EditOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Avatar } from '~/shared/ReactJS';

interface Props {
  avatar: string | undefined;
}

export const AvatarDragger: FC<Props> = ({ avatar }) => {
  return (
    <div className="group relative cursor-pointer rounded-full">
      <Avatar src={avatar} size={80} />
      <div className="absolute bottom-1 right-1 flex size-6 items-center justify-center rounded-full border border-solid border-neutral-100 bg-white p-2 transition-all group-hover:bg-neutral-300">
        <EditOutlined />
      </div>
    </div>
  );
};
