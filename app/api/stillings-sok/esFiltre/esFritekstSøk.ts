export const esFritekstSøk = (fritekst: string, valgteFilter: any[]) => {
  if (!fritekst || fritekst.length < 1) return [];

  const feltManSkalSøkeI: string[] = [];

  // TODO Se over / Lag filter?
  // feltManSkalSøkeI.push('stilling.employer.name', 'stilling.employer.orgnr');
  // feltManSkalSøkeI.push(`stilling.styrkEllerTittel`);
  // feltManSkalSøkeI.push('stilling.adtext_no');
  // feltManSkalSøkeI.push('stilling.annonsenr');

  if (feltManSkalSøkeI.length === 0) {
    feltManSkalSøkeI.push(
      'stilling.adtext_no^0.5',
      `stilling.styrkEllerTittel`,
      'stilling.annonsenr',
      'stilling.employer.name',
      'stilling.employer.orgnr',
      'stilling.properties.jobtitle',
      'stilling.properties.arbeidsplassenoccupation',
      'stilling.properties.keywords',
    );
  }

  const fritekstSøk = {
    multi_match: {
      type: 'cross_fields',
      query: fritekst,
      fields: feltManSkalSøkeI,
      operator: 'and',
    },
  };

  return {
    multi_match: {
      type: 'cross_fields',
      query: fritekst,
      fields: feltManSkalSøkeI,
      operator: 'and',
    },
  };
};
