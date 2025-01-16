import { selectLoading } from '@/store/slices';
import { useSelector } from 'react-redux';

const Loading = ({ tip }: { tip?: string }) => {
  const loading = useSelector(selectLoading);

  return (
    <div className={`relative ${loading ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 flex-col">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-white">{tip || 'Cargando...'}</span>
      </div>
    </div>
  );
};

export default Loading;
