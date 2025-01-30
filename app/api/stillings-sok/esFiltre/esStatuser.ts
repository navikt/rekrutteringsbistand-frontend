import { StillingsStatusTyper } from '../../../stillings-sok/components/StillingsSøkFilter/StatusFilter';

export const esStatuser = (statuser: string[]) => {
  const ingenFiltreValgt = statuser.length === 0;
  const alleFiltreValgt =
    statuser.length === Object.keys(StillingsStatusTyper).length;

  console.log('🎺 statuser', statuser);
  if (ingenFiltreValgt || alleFiltreValgt) {
    return alleStillinger;
  }
  const statusSpørringer: any[] = [];
  if (statuser.includes(StillingsStatusTyper.Publisert))
    statusSpørringer.push(publisert);
  if (statuser.includes(StillingsStatusTyper.Stoppet))
    statusSpørringer.push(stoppet);
  if (statuser.includes(StillingsStatusTyper.Utløpt))
    statusSpørringer.push(utløpt);

  return [
    {
      bool: {
        should: statusSpørringer,
      },
    },
  ];
};

const stillingenErEllerHarVærtPublisert = [
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

export const alleStillinger = [
  {
    bool: {
      must_not: [
        {
          term: {
            'stilling.status': 'REJECTED',
          },
        },
        {
          term: {
            'stilling.status': 'DELETED',
          },
        },
      ],
      must: stillingenErEllerHarVærtPublisert,
    },
  },
];

const publisert = {
  term: {
    'stilling.status': 'ACTIVE',
  },
};

const stoppet = {
  bool: {
    must: [
      { term: { 'stilling.status': 'STOPPED' } },
      ...stillingenErEllerHarVærtPublisert,
    ],
  },
};

const utløpt = {
  bool: {
    must: [
      { term: { 'stilling.status': 'INACTIVE' } },
      {
        range: {
          'stilling.expires': {
            lt: 'now/d',
          },
        },
      },
      ...stillingenErEllerHarVærtPublisert,
    ],
  },
};
