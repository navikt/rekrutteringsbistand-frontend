import{x as e,j as r,bj as _,H as m,B as D}from"./iframe-6grgfNuj.js";import{T as G}from"./TilgangskontrollForInnhold-D0z3C0K-.js";import"./preload-helper-PPVm8Dsz.js";import"./ErrorBoundary-DgUvCIOI.js";import"./Link-BRwCl624.js";const i=c=>({roller:c,ident:"Z123456",navn:"Test Testesen",fornavn:"Test",etternavn:"Testesen",enheter:[]}),P={tags:["autodocs"],component:G,decorators:[(c,I)=>{const A=I.args.mockRoller||[],S=i(A);return r.jsx(_,{brukerData:S,aktivEnhet:null,aktivBruker:null,children:r.jsx(c,{})})}]},R=()=>r.jsxs("div",{style:{padding:"2rem",background:"var(--ax-surface-subtle)",borderRadius:"8px"},children:[r.jsx(m,{size:"medium",spacing:!0,children:"Beskyttet innhold"}),r.jsx(D,{children:"Dette innholdet krever spesielle roller for å vises."})]}),E={args:{mockRoller:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:r.jsx(R,{})}},n={args:{mockRoller:[],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:r.jsx(R,{})}},o={args:{mockRoller:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:r.jsx(R,{})}},l={args:{mockRoller:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,e.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],children:r.jsx(R,{})}},s={args:{mockRoller:[],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,e.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],children:r.jsx(R,{})}},a={args:{mockRoller:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],manglerEierskap:!0,children:r.jsx(R,{})}},T={args:{mockRoller:[],kreverEnAvRollene:[e.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],skjulVarsel:!0,children:r.jsx(R,{})}},t={args:{mockRoller:[],kreverEnAvRollene:null,children:r.jsx(R,{})}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    children: <ExampleContent />
  }
} as any`,...E.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    children: <ExampleContent />
  }
} as any`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    children: <ExampleContent />
  }
} as any`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET, Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    children: <ExampleContent />
  }
} as any`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET, Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    children: <ExampleContent />
  }
} as any`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    manglerEierskap: true,
    children: <ExampleContent />
  }
} as any`,...a.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    skjulVarsel: true,
    children: <ExampleContent />
  }
} as any`,...T.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [],
    kreverEnAvRollene: null,
    children: <ExampleContent />
  }
} as any`,...t.parameters?.docs?.source}}};export{n as HarIkkeTilgang,E as HarTilgang,o as HarUtviklerRolle,t as IngenRollekrav,l as KreverEnAvFlereRoller,a as ManglerEierskap,s as ManglerEnAvFlereRoller,T as SkjulVarsel,P as default};
