// JSON-bodyen som sendes med DELETE-forespørselen når en eier fjernes.
export class FjernEierRequestBody {
  kontorNavn?: string;

  constructor(kontorNavn?: string) {
    this.kontorNavn = kontorNavn;
  }
}
