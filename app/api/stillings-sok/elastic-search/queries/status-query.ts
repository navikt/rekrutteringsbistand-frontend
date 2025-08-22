import { StillingsStatusTyper } from '../../../../stilling/components/StillingsSøkFilter/StatusFilter';
import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

// Hjelper-funksjon for å lage publisert-kriterier
const getPublisertKriterier = () => [
  {
    term: {
      'stilling.administration.status': 'DONE',
    },
  },
  {
    exists: {
      field: 'stilling.publishedByAdmin',
    },
  },
  {
    range: {
      'stilling.published': {
        lte: 'now/d',
      },
    },
  },
];

const alleStillinger = (esBuilder: ElasticSearchQueryBuilder) => {
  // Legg til bool-query med must_not for REJECTED/DELETED og must for publisert-kriterier
  esBuilder.addBoolFilter({
    must_not: [
      { term: { 'stilling.status': 'REJECTED' } },
      { term: { 'stilling.status': 'DELETED' } },
    ],
    must: getPublisertKriterier(),
  });
};

// Funksjon for å lage stoppet status query
const getStoppetQuery = () => ({
  bool: {
    must: [
      {
        term: {
          'stilling.status': 'STOPPED',
        },
      },
      ...getPublisertKriterier(),
    ],
  },
});

// Funksjon for å lage utløpt status query
const getUtløptQuery = () => ({
  bool: {
    must: [
      {
        term: {
          'stilling.status': 'INACTIVE',
        },
      },
      {
        range: {
          'stilling.expires': {
            lt: 'now/d',
          },
        },
      },
      ...getPublisertKriterier(),
    ],
  },
});

export const statusQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const statuser = params.filter.statuser;

  const ingenFiltreValgt = statuser.length === 0;
  const alleFiltreValgt =
    statuser.length === Object.keys(StillingsStatusTyper).length;

  if (ingenFiltreValgt || alleFiltreValgt) {
    if (params.navIdent) {
      return;
    }
    return alleStillinger(esBuilder);
  }

  // Samle should-clauses for valgte statuser
  const shouldClauses: any[] = [];

  if (statuser.includes(StillingsStatusTyper.Publisert)) {
    // Legg til ACTIVE status som should-clause
    shouldClauses.push({
      term: {
        'stilling.status': 'ACTIVE',
      },
    });
  }

  if (statuser.includes(StillingsStatusTyper.Stoppet)) {
    shouldClauses.push(getStoppetQuery());
  }

  if (statuser.includes(StillingsStatusTyper.Utløpt)) {
    shouldClauses.push(getUtløptQuery());
  }

  if (shouldClauses.length > 0) {
    esBuilder.addBoolFilter({
      should: shouldClauses,
      minimum_should_match: 1,
    });
  }
};
