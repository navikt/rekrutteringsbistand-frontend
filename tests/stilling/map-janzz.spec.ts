import { JanzzTittelDTO } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { mapJanzzTilKategori } from '@/app/stilling/_ui/stilling-admin/_util/mapJanzz';
import { expect, test } from '@playwright/test';

const yrkestittel: JanzzTittelDTO = {
  konseptId: 175819,
  styrk08: '3411',
  styrk08Label: 'Juridiske yrker',
  esco: '',
  escoLabel: '',
  label: 'Testamentåpningsrepresentant',
  undertype: '',
};

const janzzKategori = {
  id: null,
  code: '175819',
  categoryType: 'JANZZ',
  name: yrkestittel.label,
  description: null,
  parentId: null,
};

const styrkKategori = {
  id: null,
  code: '3411',
  categoryType: 'STYRK08',
  name: yrkestittel.styrk08Label,
  description: null,
  parentId: null,
};

test.describe('Mapping av Janzz til kategorier', () => {
  for (const esco of ['', '   ']) {
    test(`utelater ESCO med tom kode (${JSON.stringify(esco)})`, () => {
      expect(mapJanzzTilKategori({ ...yrkestittel, esco })).toEqual([
        janzzKategori,
        styrkKategori,
      ]);
    });
  }

  test('bevarer ESCO med kode og de andre kategoriene i samme rekkefølge', () => {
    const esco = 'http://data.europa.eu/esco/isco/C3411';
    const escoLabel = 'Juridiske yrker';

    expect(mapJanzzTilKategori({ ...yrkestittel, esco, escoLabel })).toEqual([
      janzzKategori,
      {
        id: null,
        code: esco,
        categoryType: 'ESCO',
        name: escoLabel,
        description: null,
        parentId: null,
      },
      styrkKategori,
    ]);
  });
});
