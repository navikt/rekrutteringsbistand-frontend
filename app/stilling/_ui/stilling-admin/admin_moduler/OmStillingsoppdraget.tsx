import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Definisjon from '@/app/stilling/[stillingsId]/_ui/Definisjon';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { formaterNorskDato } from '@/util/util';

export default function OmStillingsoppdraget() {
  const { stillingsData } = useStillingsContext();
  const { annonsenr, uuid, updated, administration } =
    stillingsData?.stilling ?? {};
  const { reportee, navIdent } = administration ?? {};

  return (
    <RedigerBoks tittel='Om stillingsoppdraget'>
      <dl className='grid gap-6 md:grid-cols-3'>
        <Definisjon tittel='Annonsenummer' innhold={annonsenr ?? '-'} />
        <Definisjon
          tittel='Sist endret'
          innhold={
            updated
              ? formaterNorskDato({ dato: updated as string, visning: 'tall' })
              : '-'
          }
        />
        <Definisjon
          tittel='Kontaktperson hos NAV'
          innhold={`${reportee ?? '-'} ${navIdent ? `(${navIdent})` : ''}`}
        />
      </dl>
      <dl className='mt-6'>
        <Definisjon tittel='Referanse' innhold={uuid ?? '-'} />
      </dl>
    </RedigerBoks>
  );
}
