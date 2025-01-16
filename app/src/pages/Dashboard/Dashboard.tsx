import { setLoading } from '@/store/slices';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  // dispatch(setLoading(false));

  return (
    <>
      <div>El wen Dashboard {'>'};3</div>
    </>
  );
};

export default Dashboard;
