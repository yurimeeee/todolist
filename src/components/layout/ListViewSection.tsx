import ListTable from '@components/ListTable';
import { Button } from 'antd';
import { Todo } from 'src/types/type';

interface ListViewSectionProps {
  data: Todo[];
}

const ListViewSection = ({ data }: ListViewSectionProps) => {
  return (
    <>
      <ListTable data={data} isActiveDelete />
    </>
  );
};

export default ListViewSection;
