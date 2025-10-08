import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { StillingsSøkPortefølje } from '@/app/stilling/_util/stillingssøk-typer';

/**
 * Portefølje tab
 */
export const esPortefølje = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  // Fjern arbeidstrening og formidling

  if (!params.formidlinger) {
    esBuilder.addBoolFilter({
      must_not: [
        { term: { 'stillingsinfo.stillingskategori': 'ARBEIDSTRENING' } },
        { term: { 'stillingsinfo.stillingskategori': 'FORMIDLING' } },
      ],
    });
  } else {
    esBuilder.addMust('stillingsinfo.stillingskategori', 'FORMIDLING');
  }

  if (params.filter.portefølje === StillingsSøkPortefølje.INTERN) {
    esBuilder.addBoolFilter({
      must_not: [
        { term: { 'stilling.status': 'REJECTED' } },
        { term: { 'stilling.status': 'DELETED' } },
      ],
      should: [
        {
          bool: {
            must: [
              { exists: { field: 'stillingsinfo' } },
              { term: { 'stilling.administration.status': 'DONE' } },
              { exists: { field: 'stilling.publishedByAdmin' } },
              { range: { 'stilling.published': { lte: 'now/d' } } },
            ],
          },
        },
        {
          bool: {
            should: [
              { term: { 'stilling.administration.navIdent': params.navIdent } },
              { term: { 'stillingsinfo.eierNavident': params.navIdent } },
            ],
          },
        },
      ],
    });
  } else if (params.filter.portefølje === StillingsSøkPortefølje.VIS_MINE) {
    // Validerer at navIdent finnes og ikke er tom
    if (params.navIdent) {
      if (!params.filter.visAvbryt) {
        esBuilder.addBoolFilter({
          must_not: [
            { term: { 'stilling.status': 'REJECTED' } },
            { term: { 'stilling.status': 'DELETED' } },
          ],
        });
      }

      esBuilder.addBoolFilter({
        should: [
          { term: { 'stilling.administration.navIdent': params.navIdent } },
          { term: { 'stillingsinfo.eierNavident': params.navIdent } },
        ],
        minimum_should_match: 1,
      });
    }
  } else if (params.filter.portefølje === StillingsSøkPortefølje.MITT_KONTOR) {
    // Validerer at eierNavKontorEnhetId finnes og ikke er tom
    if (params.eierNavKontorEnhetId) {
      esBuilder.addBoolFilter({
        must: [
          {
            term: {
              'stillingsinfo.eierNavKontorEnhetId': params.eierNavKontorEnhetId,
            },
          },
        ],
        must_not: [
          { term: { 'stilling.status': 'DELETED' } },
          { term: { 'stilling.status': 'REJECTED' } },
        ],
        should: [
          {
            bool: {
              must: [
                {
                  term: {
                    'stillingsinfo.eierNavKontorEnhetId':
                      params.eierNavKontorEnhetId,
                  },
                },
                { term: { 'stilling.administration.status': 'DONE' } },
                { exists: { field: 'stilling.publishedByAdmin' } },
                { range: { 'stilling.published': { lte: 'now/d' } } },
              ],
            },
          },
          {
            bool: {
              must: [{ term: { 'stilling.status': 'INACTIVE' } }],
              should: [
                {
                  term: {
                    'stillingsinfo.eierNavKontorEnhetId':
                      params.eierNavKontorEnhetId,
                  },
                },
                {
                  term: { 'stilling.administration.navIdent': params.navIdent },
                },
                { term: { 'stillingsinfo.eierNavident': params.navIdent } },
              ],
            },
          },
        ],
        minimum_should_match: 1,
      });
    }

    // // Ekskluder "Ikke publisert" og "Avbrutt" statuser fra Mitt kontor søkeresultater
    esBuilder.addBoolFilter({
      must_not: [
        // Ekskluder "Avbrutt" (DELETED)
        { term: { 'stilling.status': 'DELETED' } },
        { term: { 'stilling.status': 'REJECTED' } },
      ],
    });
  } else if (
    params.filter.portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO
  ) {
    esBuilder.addFilter({ term: { 'stilling.privacy': 'SHOW_ALL' } });
    esBuilder.addBoolFilter({
      must_not: [{ term: { 'stilling.source': 'DIR' } }],
    });
    if (!params.filter.utenOppdrag) {
      esBuilder.addFilter({ exists: { field: 'stillingsinfo' } });
    } else {
      esBuilder.addBoolFilter({
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
        must: [
          { term: { 'stilling.administration.status': 'DONE' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
      });
    }
  }
};
