import{cP as p,h as d,cO as c,cQ as g,az as e,Z as l}from"./iframe-G1hfx8xa.js";import"./preload-helper-BWMAHTUm.js";const v={tags:["autodocs"],component:p},n={args:{message:"Dette er en enkel feilmelding"}},s={args:{error:new d({message:"Kunne ikke hente kandidater",feilkode:"REKBIS-12345",details:"API-kall til /api/kandidater feilet med 500 Internal Server Error"})}},a={args:{error:new d({message:"En feil oppstod under lagring",feilkode:"REKBIS-67890"})}},t={args:{zodError:(()=>{const m=c({navn:e().min(2,"Navn må være minst 2 tegn"),epost:e().email("Ugyldig e-postadresse"),alder:g().min(18,"Må være minst 18 år")});try{m.parse({navn:"A",epost:"ikke-en-epost",alder:15})}catch(r){if(r instanceof l)return r}})()}},o={args:{zodError:(()=>{const m=c({fornavn:e().min(1,"Fornavn er påkrevd"),etternavn:e().min(1,"Etternavn er påkrevd"),telefon:e().regex(/^\d{8}$/,"Telefonnummer må være 8 siffer"),postnummer:e().length(4,"Postnummer må være 4 siffer"),dato:e().min(1,"Dato er påkrevd")});try{m.parse({fornavn:"",etternavn:"",telefon:"123",postnummer:"12",dato:""})}catch(r){if(r instanceof l)return r}})()}},i={args:{error:new Error("Dette er en standard JavaScript Error"),message:"En uventet feil oppstod"}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    message: 'Dette er en enkel feilmelding'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    error: new RekbisError({
      message: 'Kunne ikke hente kandidater',
      feilkode: 'REKBIS-12345',
      details: 'API-kall til /api/kandidater feilet med 500 Internal Server Error'
    })
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    error: new RekbisError({
      message: 'En feil oppstod under lagring',
      feilkode: 'REKBIS-67890'
    })
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    zodError: (() => {
      const schema = z.object({
        navn: z.string().min(2, 'Navn må være minst 2 tegn'),
        epost: z.string().email('Ugyldig e-postadresse'),
        alder: z.number().min(18, 'Må være minst 18 år')
      });
      try {
        schema.parse({
          navn: 'A',
          epost: 'ikke-en-epost',
          alder: 15
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return error;
        }
      }
      return undefined;
    })()
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    zodError: (() => {
      const schema = z.object({
        fornavn: z.string().min(1, 'Fornavn er påkrevd'),
        etternavn: z.string().min(1, 'Etternavn er påkrevd'),
        telefon: z.string().regex(/^\\d{8}$/, 'Telefonnummer må være 8 siffer'),
        postnummer: z.string().length(4, 'Postnummer må være 4 siffer'),
        dato: z.string().min(1, 'Dato er påkrevd')
      });
      try {
        schema.parse({
          fornavn: '',
          etternavn: '',
          telefon: '123',
          postnummer: '12',
          dato: ''
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return error;
        }
      }
      return undefined;
    })()
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    error: new Error('Dette er en standard JavaScript Error'),
    message: 'En uventet feil oppstod'
  }
}`,...i.parameters?.docs?.source}}};export{n as EnkelFeilmelding,s as RekbisFeil,a as RekbisFeilUtenDetails,i as UkjentFeil,o as ZodFlereValideringsFeil,t as ZodValideringsFeil,v as default};
