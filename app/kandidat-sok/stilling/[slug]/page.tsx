'use client';
import { useParams } from 'next/navigation';
import { usePamGeografi } from '../../../api/pam-geografi/usePamGeografi';
import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import Sidelaster from '../../../components/Sidelaster';
import KandidatTilStilling from './KandidatTilStilling';

//TODO
// const hentØnsketStedFraStilling = (
//   rekrutteringsbistandstilling: StillingsDataDTO,
//   fylker: PamGeografi[],
// ): string | null => {
//   const { location } = rekrutteringsbistandstilling.stilling;

//   if (location?.municipal && location?.municipalCode) {
//     const nyttSted = stedmappingFraGammeltNummer.get(location.municipalCode);

//     return nyttSted ? nyttSted.navn : formaterStedsnavn(location.municipal);
//   } else if (location?.county) {
//     const nåværendeCounty =
//       stedmappingFraGammeltNavn
//         .get(formaterStedsnavn(location.county))
//         ?.navn?.toUpperCase() || location.county;

//     const fylke = fylker?.find((f) => f.name.toUpperCase() === nåværendeCounty);

//     return fylke?.capitalizedName || null;
//   } else {
//     return null;
//   }
// };

// //TODO
// const hentØnsketYrkeFraStilling = (
//   rekrutteringsbistandstilling: StillingsDataDTO,
// ): string[] => {
//   const { categoryList } = rekrutteringsbistandstilling.stilling;

//   if (!categoryList) {
//     return [];
//   }

//   return categoryList
//     .filter(
//       (category) =>
//         category.categoryType === 'STYRK08' ||
//         category.categoryType === 'STYRK08NAV',
//     )
//     .map((category) => category.name)
//     .filter((name): name is string => name !== null);
// };

export default function KandidatForStilling() {
  const params = useParams();
  const stillingsId = params.slug;

  if (typeof stillingsId !== 'string') {
    throw new Error('Stillings-ID må være en streng');
  }
  const stillingsData = useStilling(stillingsId);
  const geografiData = usePamGeografi();

  if (stillingsData.isLoading || geografiData.isLoading) {
    return <Sidelaster />;
  }

  return <KandidatTilStilling stillingsData={stillingsData.data} />;
}
