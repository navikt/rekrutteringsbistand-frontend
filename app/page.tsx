import Hurtiglenker from './forside/components/Hurtiglenker';
import Statistikk from './forside/components/Statistikk';

export default async function Home() {
  return (
    <div>
      <div className='mt-4'>
        <Hurtiglenker />
      </div>
      <div className='mt-8'>
        <Statistikk />
      </div>
    </div>
  );
}
