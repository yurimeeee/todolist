import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

interface FloatInfoBtnProps {
  onClick: () => void;
}

const FloatInfoBtn = ({ onClick }: FloatInfoBtnProps) => {
  return <FloatButton onClick={onClick} icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />;
};

export default FloatInfoBtn;
