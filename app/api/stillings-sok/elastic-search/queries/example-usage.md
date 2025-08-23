// Eksempel på bruk av de nye metodene i ElasticSearchQueryBuilder
import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder'

// Eksempel 1: Legg til simple_query_string med minimum_should_match
const builder1 = new ElasticSearchQueryBuilder()
.addFilter('status', 'AKTIV')
.addSimpleQueryString(
'utvikler javascript',
['stilling.tittel', 'stilling.adtext_no'],
'and',
)
.setMinimumShouldMatch(1);

// Eksempel 2: Bruk addFritekstSøk for å automatisk bruke esFritekstSøk
const builder2 = new ElasticSearchQueryBuilder()
.addFilter('stillingsinfo.eierNavKontorEnhetId', '1234')
.addFritekstSøk('frontend utvikler', 'tittel')
.setMinimumShouldMatch('50%');

// Eksempel 3: Kombinere flere should-clauses
const builder3 = new ElasticSearchQueryBuilder()
.addFilter('status', 'AKTIV')
.addShould('stilling.employer.name', 'NAV')
.addFritekstSøk('react typescript')
.setMinimumShouldMatch(1);
