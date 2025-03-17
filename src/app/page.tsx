import LevelBadge from '@/features/common/LevelBadge';
import StageView from '@/features/routes/home/StageView';

export default function Home() {
  return (
    <div className='flex justify-between w-full h-screen'>
      <div className='w-full h-full flex items-center justify-center mr-5'>
        <StageView />
      </div>
        <LevelBadge />
    </div>
  );
}
