import { StillingsSøkPortefølje } from '../../../../stilling/stillingssøk-typer';
import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

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
    // Viser kun stillinger med stillingsinfo (har kandidatliste)
    esBuilder.addFilter({ exists: { field: 'stillingsinfo' } });

    //Viser kun publiserte:
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
  } else if (params.filter.portefølje === StillingsSøkPortefølje.VIS_MINE) {
    esBuilder.addBoolFilter({
      should: [
        { term: { 'stilling.administration.navIdent': params.navIdent } },
        { term: { 'stillingsinfo.eierNavident': params.navIdent } },
      ],
      minimum_should_match: 1,
    });
  } else if (params.filter.portefølje === StillingsSøkPortefølje.MITT_KONTOR) {
    esBuilder.addFilter({
      term: {
        'stillingsinfo.eierNavKontorEnhetId': params.eierNavKontorEnhetId,
      },
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
