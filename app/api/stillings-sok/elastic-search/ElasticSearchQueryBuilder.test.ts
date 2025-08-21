// Simple test to validate the query structure
const testQuery = {
  filter: {
    side: 1,
    fritekst: ['utvikler'],
    statuser: ['publisert'],
    fylker: [],
    kommuner: [],
    portefølje: 'intern',
    inkludering: [],
    inkluderingUnderkategori: [],
    kategori: [],
    publisert: [],
    sortering: 'publiseringsdato',
    utenOppdrag: false,
  },
};

// Mock implementation to test structure
const mockQuery = {
  size: 20,
  from: 0,
  track_total_hits: true,
  query: {
    bool: {
      filter: [{ term: { 'stilling.status': 'ACTIVE' } }],
      must: [{ match: { 'stilling.tittel': 'utvikler' } }],
      should: [{ match: { 'stilling.employer.name': 'NAV' } }],
      must_not: [{ term: { 'stilling.status': 'DELETED' } }],
      minimum_should_match: '1',
    },
  },
};
