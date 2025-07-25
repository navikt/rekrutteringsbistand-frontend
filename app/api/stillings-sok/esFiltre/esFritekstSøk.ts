export const esFritekstSøk = (fritekst: string, felt?: string) => {
  if (!fritekst || fritekst.length < 1) return [];

  const feltManSkalSøkeI: string[] = [];

  if (felt === 'arbeidsgiver') {
    feltManSkalSøkeI.push('stilling.employer.name', 'stilling.employer.orgnr');
  } else if (felt === 'tittel') {
    feltManSkalSøkeI.push(
      'stilling.styrkEllerTittel',
      'stilling.tittel',
      'stilling.properties.jobtitle',
    );
  } else if (felt === 'annonsetekst') {
    feltManSkalSøkeI.push('stilling.adtext_no');
  } else if (felt === 'annonsenummer') {
    feltManSkalSøkeI.push('stilling.annonsenr');
  } else {
    feltManSkalSøkeI.push(
      'stilling.adtext_no^0.5',
      'stilling.tittel',
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
    simple_query_string: {
      query: fritekst,
      fields: feltManSkalSøkeI,
      default_operator: 'and',
    },
  };
};
