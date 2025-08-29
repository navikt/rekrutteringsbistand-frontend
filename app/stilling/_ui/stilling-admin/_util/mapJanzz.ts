import { JanzzTittelDTO } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { CategorySchemaDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const mapJanzzTilKategori = (
  janzz: JanzzTittelDTO,
): CategorySchemaDTO[] => {
  return [
    {
      id: null,
      code: janzz?.konseptId.toString() ?? null,
      categoryType: 'JANZZ',
      name: janzz?.label ?? null,
      description: null,
      parentId: null,
    },
    {
      id: null,
      code: janzz?.esco ?? null,
      categoryType: 'ESCO',
      name: janzz?.escoLabel ?? null,
      description: null,
      parentId: null,
    },
    {
      id: null,
      code: janzz?.styrk08 ?? null,
      categoryType: 'STYRK08',
      name: janzz?.styrk08Label ?? null,
      description: null,
      parentId: null,
    },
  ];
};
