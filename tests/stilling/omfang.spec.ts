import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { omfangClause } from '@/app/api/stillings-sok/elastic-search/queries/omfang-query';
import { StillingsSøkOmfang } from '@/app/stilling/_util/stillingssøk-typer';
import { visOmfang } from '@/app/stilling/_util/visOmfang';
import { expect, test } from '@playwright/test';

const forventetHeltid = {
  term: { 'stilling.properties.extent': 'Heltid' },
};

const forventetDeltid = {
  bool: {
    should: [
      { term: { 'stilling.properties.extent': 'Deltid' } },
      {
        bool: {
          filter: [{ exists: { field: 'stilling.properties.jobpercentage' } }],
          must_not: [
            { terms: { 'stilling.properties.jobpercentage': ['100', ''] } },
          ],
        },
      },
      {
        bool: {
          filter: [
            { exists: { field: 'stilling.properties.jobpercentagerange' } },
          ],
          must_not: [
            { term: { 'stilling.properties.jobpercentagerange': '' } },
          ],
        },
      },
    ],
    minimum_should_match: 1,
  },
};

test.describe('Omfangsspørring', () => {
  test('Deltid treffer omfang, prosent ulik 100 eller prosentintervall', () => {
    expect(omfangClause(StillingsSøkOmfang.Deltid)).toEqual(forventetDeltid);
  });

  test('Heltid bruker fortsatt det opprinnelige omfanget', () => {
    expect(omfangClause(StillingsSøkOmfang.Heltid)).toEqual(forventetHeltid);
  });

  test('Omfangsantall bruker samme regler, utelater eget filter og beholder andre filtre', () => {
    const status = { term: { 'stilling.status': 'ACTIVE' } };
    const ansettelsesform = {
      terms: { 'stilling.properties.engagementtype': ['Fast'] },
    };
    const omfang = {
      bool: {
        filter: [
          omfangClause(StillingsSøkOmfang.Heltid),
          omfangClause(StillingsSøkOmfang.Deltid),
        ],
      },
    };
    const builder = new ElasticSearchQueryBuilder();
    builder.addFilter(status);
    builder.addFasettFilter('omfang', omfang);
    builder.addFasettFilter('ansettelsesform', ansettelsesform);
    builder.setStandardAggregation(undefined, undefined, undefined, {
      includePortfolioInCounts: true,
    });

    const resultat = builder.build();
    expect(resultat.query.bool.filter).toEqual([
      status,
      omfang,
      ansettelsesform,
    ]);

    const fasetter = resultat.aggs.globalAggregering.aggs;
    expect(fasetter.omfang.aggs.koder.filters.filters).toEqual({
      heltid: forventetHeltid,
      deltid: forventetDeltid,
    });
    expect(fasetter.omfang.filter.bool.filter).toEqual([
      { bool: { filter: [status, ansettelsesform] } },
    ]);
    expect(fasetter.ansettelsesform.filter.bool.filter).toEqual([
      { bool: { filter: [status, omfang] } },
    ]);
  });
});

test.describe('Omfangsvisning', () => {
  for (const { navn, egenskaper, forventet } of [
    {
      navn: '20 prosent',
      egenskaper: { extent: 'Heltid', jobpercentage: '20' },
      forventet: 'Heltid og deltid',
    },
    {
      navn: 'numerisk prosent',
      egenskaper: { extent: 'Heltid', jobpercentage: 20 },
      forventet: 'Heltid og deltid',
    },
    {
      navn: '100 prosent',
      egenskaper: { extent: 'Heltid', jobpercentage: '100' },
      forventet: 'Heltid',
    },
    {
      navn: 'numerisk 100 prosent',
      egenskaper: { extent: 'Heltid', jobpercentage: 100 },
      forventet: 'Heltid',
    },
    {
      navn: 'prosentintervall',
      egenskaper: { extent: 'Heltid', jobpercentagerange: '20-100' },
      forventet: 'Heltid og deltid',
    },
    {
      navn: 'prosentintervall selv om prosenten er 100',
      egenskaper: {
        extent: 'Heltid',
        jobpercentage: '100',
        jobpercentagerange: '20-100',
      },
      forventet: 'Heltid og deltid',
    },
    {
      navn: 'manglende prosentfelter',
      egenskaper: { extent: 'Heltid' },
      forventet: 'Heltid',
    },
    {
      navn: 'null i prosentfeltene',
      egenskaper: {
        extent: 'Heltid',
        jobpercentage: null,
        jobpercentagerange: null,
      },
      forventet: 'Heltid',
    },
    {
      navn: 'tomme prosentfelter',
      egenskaper: {
        extent: 'Heltid',
        jobpercentage: '',
        jobpercentagerange: '',
      },
      forventet: 'Heltid',
    },
    {
      navn: 'opprinnelig deltid',
      egenskaper: { extent: 'Deltid', jobpercentage: '20' },
      forventet: 'Deltid',
    },
    {
      navn: 'opprinnelig kombinert omfang',
      egenskaper: { extent: 'Heltid og Deltid', jobpercentage: '20' },
      forventet: 'Heltid og deltid',
    },
  ]) {
    test(navn, () => {
      expect(visOmfang(egenskaper)).toBe(forventet);
    });
  }

  test('manglende egenskaper gir ikke et oppdiktet omfang', () => {
    expect(visOmfang()).toBeUndefined();
    expect(visOmfang(null)).toBeUndefined();
  });
});
