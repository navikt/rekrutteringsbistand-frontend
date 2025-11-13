import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';

export const adminStatusDonePendingOrMissing = () => ({
  bool: {
    should: [
      { term: { 'stilling.administration.status': 'DONE' } },
      { term: { 'stilling.administration.status': 'PENDING' } },
      {
        bool: {
          must_not: [
            {
              exists: {
                field: 'stilling.administration.status',
              },
            },
          ],
        },
      },
    ],
    minimum_should_match: 1,
  },
});

export const buildVisningsstatusBool = (status: VisningsStatus) => {
  switch (status) {
    case VisningsStatus.ApenForSokere:
      return {
        must: [
          { term: { 'stilling.status': 'ACTIVE' } },
          { exists: { field: 'stillingsinfo' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
          adminStatusDonePendingOrMissing(),
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      };
    case VisningsStatus.StengtForSokere:
      return {
        must: [
          { term: { 'stilling.status': 'INACTIVE' } },
          adminStatusDonePendingOrMissing(),
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { range: { 'stilling.expires': { lt: 'now/d' } } },
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      };
    case VisningsStatus.UtloptStengtForSokere:
      return {
        must: [
          { term: { 'stilling.status': 'INACTIVE' } },
          adminStatusDonePendingOrMissing(),
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
          { range: { 'stilling.expires': { lt: 'now/d' } } },
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      };
    case VisningsStatus.Fullfort:
      return {
        must: [
          { term: { 'stilling.status': 'STOPPED' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      };
    case VisningsStatus.IkkePublisert:
      return {
        must: [{ term: { 'stilling.status': 'INACTIVE' } }],
        must_not: [
          { exists: { field: 'stilling.publishedByAdmin' } },
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      };
    case VisningsStatus.Slettet:
      return {
        must: [{ term: { 'stilling.status': 'DELETED' } }],
      };
    default:
      return {};
  }
};
