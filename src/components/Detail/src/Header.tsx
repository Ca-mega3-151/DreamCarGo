import { ArrowLeftOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

interface Props {
  onBack?: () => void;
  title: ReactNode;
}

export const DetailHeader = ({ title, onBack }: Props) => {
  return (
    <div className="mb-2 flex items-center gap-3 text-xl font-bold">
      <ArrowLeftOutlined className="cursor-pointer" onClick={onBack} />
      {title}
    </div>
  );
};
