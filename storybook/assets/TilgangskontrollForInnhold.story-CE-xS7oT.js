import{j as e,l as r,i9 as _,H as m,z as D}from"./iframe-DYYFo0EH.js";import{T as G}from"./TilgangskontrollForInnhold-DmBvtx0h.js";import"./preload-helper-BWMAHTUm.js";import"./ErrorBoundary-CK2SksSx.js";import"./Link-CNFJiH9C.js";const i=c=>({roller:c,ident:"Z123456",navn:"Test Testesen",fornavn:"Test",etternavn:"Testesen",enheter:[]}),P={tags:["autodocs"],component:G,decorators:[(c,I)=>{const A=I.args.mockRoller||[],S=i(A);return e.jsx(_,{brukerData:S,aktivEnhet:null,aktivBruker:null,children:e.jsx(c,{})})}]},R=()=>e.jsxs("div",{style:{padding:"2rem",background:"var(--ax-surface-subtle)",borderRadius:"8px"},children:[e.jsx(m,{size:"medium",spacing:!0,children:"Beskyttet innhold"}),e.jsx(D,{children:"Dette innholdet krever spesielle roller for å vises."})]}),E={args:{mockRoller:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:e.jsx(R,{})}},n={args:{mockRoller:[],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:e.jsx(R,{})}},l={args:{mockRoller:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:e.jsx(R,{})}},o={args:{mockRoller:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,r.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],children:e.jsx(R,{})}},s={args:{mockRoller:[],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,r.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],children:e.jsx(R,{})}},a={args:{mockRoller:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],manglerEierskap:!0,children:e.jsx(R,{})}},T={args:{mockRoller:[],kreverEnAvRollene:[r.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],skjulVarsel:!0,children:e.jsx(R,{})}},t={args:{mockRoller:[],kreverEnAvRollene:null,children:e.jsx(R,{})}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
} as any`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    children: <ExampleContent />
  }
} as any`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    kreverEnAvRollene: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET, Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    children: <ExampleContent />
  }
} as any`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
} as any`,...t.parameters?.docs?.source}}};export{n as HarIkkeTilgang,E as HarTilgang,l as HarUtviklerRolle,t as IngenRollekrav,o as KreverEnAvFlereRoller,a as ManglerEierskap,s as ManglerEnAvFlereRoller,T as SkjulVarsel,P as default};
