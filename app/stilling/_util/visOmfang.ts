interface OmfangEgenskaper {
  extent?: string | null;
  jobpercentage?: string | number | null;
  jobpercentagerange?: string | null;
}

export const visOmfang = (egenskaper?: OmfangEgenskaper | null) => {
  const { extent, jobpercentage, jobpercentagerange } = egenskaper ?? {};
  const harDeltidsprosent =
    jobpercentage != null &&
    jobpercentage !== '' &&
    String(jobpercentage) !== '100';
  const harProsentintervall =
    jobpercentagerange != null && jobpercentagerange !== '';

  return extent === 'Heltid og Deltid' ||
    (extent === 'Heltid' && (harDeltidsprosent || harProsentintervall))
    ? 'Heltid og deltid'
    : extent;
};
