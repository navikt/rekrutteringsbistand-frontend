import{j as r,r as i}from"./iframe-WlOW16KT.js";import{R as n}from"./RekrutteringstreffContext-2GYrPC_t.js";import{S as a}from"./StillingsContext-BX8ONHb7.js";const o=({children:t,id:e="storybook-rekrutteringstreff-id"})=>r.jsx(n,{rekrutteringstreffId:e,children:t}),s={stilling:{uuid:"storybook-stilling-id",updated:new Date().toISOString(),administration:{reportee:"Veileder X"},status:"ACTIVE"},stillingsinfo:{stillingskategori:"STILLING"}},d=({children:t,data:e=s})=>r.jsx(a,{stillingsData:e,children:t}),f={current:null},l={kandidatId:"kand-1",fornavn:"Kari",etternavn:"Nordmann",beskrivelse:"Erfaren utvikler med fokus på tilgjengelighet.",sprak:[],godkjenninger:[],kompetanse:[]},c=i.createContext(void 0),p=({children:t,kandidat:e=l})=>r.jsx(c.Provider,{value:{kandidatId:e.kandidatId,kandidatData:e},children:t});o.__docgenInfo={description:`Felles mocks og providere for Storybook.
Skal holde props minimale men typesikre.`,methods:[],displayName:"MockRekrutteringstreffProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},id:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'storybook-rekrutteringstreff-id'",computed:!1}}}};d.__docgenInfo={description:"",methods:[],displayName:"MockStillingsProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},data:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:`{
  stilling: {
    uuid: 'storybook-stilling-id',
    updated: new Date().toISOString(),
    administration: { reportee: 'Veileder X' },
    status: 'ACTIVE',
  },
  stillingsinfo: { stillingskategori: 'STILLING' },
}`,computed:!1}}}};p.__docgenInfo={description:"",methods:[],displayName:"KandidatMockProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},kandidat:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:`{
  kandidatId: 'kand-1',
  fornavn: 'Kari',
  etternavn: 'Nordmann',
  beskrivelse: 'Erfaren utvikler med fokus på tilgjengelighet.',
  sprak: [],
  godkjenninger: [],
  kompetanse: [],
}`,computed:!1}}}};export{p as K,o as M,d as a,f as d};
