import { useParams } from 'react-router-dom';
import KeyInfo from '../components/KeyInfo/KeyInfo';

const KeyPage = () => {
  const params = useParams();

  return <KeyInfo paramId={params.id} />;
};

export default KeyPage;
