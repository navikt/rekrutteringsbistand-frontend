export const esFritekstSøk = (
  fritekst: string,
  valgteFilter: any[],
  felt?: string,
) => {
  if (!fritekst || fritekst.length < 1) return [];

  const feltManSkalSøkeI: string[] = [];

  if (felt === 'arbeidsgiver') {
    feltManSkalSøkeI.push('stilling.employer.name', 'stilling.employer.orgnr');
  } else if (felt === 'tittel') {
    feltManSkalSøkeI.push(
      'stilling.styrkEllerTittel',
      'stilling.properties.jobtitle',
    );
  } else if (felt === 'annonsetekst') {
    feltManSkalSøkeI.push('stilling.adtext_no');
  } else if (felt === 'annonsenummer') {
    feltManSkalSøkeI.push('stilling.annonsenr');
  } else {
    feltManSkalSøkeI.push(
      'stilling.adtext_no^0.5',
      'stilling.styrkEllerTittel',
      'stilling.annonsenr',
      'stilling.employer.name',
      'stilling.employer.orgnr',
      'stilling.properties.jobtitle',
      'stilling.properties.arbeidsplassenoccupation',
      'stilling.properties.keywords',
    );
  }

  return {
    multi_match: {
      type: 'cross_fields',
      query: fritekst,
      fields: feltManSkalSøkeI,
      operator: 'and',
    },
  };
};
