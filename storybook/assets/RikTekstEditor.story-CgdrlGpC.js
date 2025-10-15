import{j as e,r as d}from"./iframe-BQJxXW9d.js";import{R as k}from"./RikTekstEditor-DFZp9c9a.js";import"./preload-helper-DoVtK-SO.js";import"./SVGDarkmode-2bG3vHdX.js";import"./image-oR5r0_iO.js";import"./use-merged-ref-DwSoUkZm.js";import"./Box-DChhigjR.js";import"./BasePrimitive-BXqzJcUK.js";const u=r=>{const[l,m]=d.useState(r.tekst??r.initial??"");return e.jsxs("div",{style:{width:"100%",maxWidth:720},children:[e.jsx(k,{...r,tekst:l,onChange:c=>{m(c)}}),e.jsxs("div",{style:{marginTop:"1rem",fontSize:"0.75rem",opacity:.7},children:[e.jsx("strong",{children:"HTML output:"}),e.jsx("div",{style:{border:"1px solid var(--ax-border-neutral-subtle)",padding:"0.5rem",marginTop:"0.25rem",borderRadius:4},children:e.jsx("code",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word"},children:l||"<tom>"})})]})]})},E={tags:["autodocs"],component:k,args:{id:"riktekst-editor",onChange:()=>{},tekst:""},render:r=>e.jsx(u,{...r})},t={},s={args:{tekst:"<p>Skriv noe her…</p>"}},a={args:{skjulToolbar:!0,tekst:"<p>Toolbar er skjult i denne varianten.</p>"}},o={args:{tekst:"<p>Dette feltet har en feil.</p>",feilMelding:"Du må fylle inn tekst"}},n={args:{tekst:"<p>Marker en tekst og trykk lenke‑ikonet for å legge til en URL.</p>",utviklerExtensions:!0}},i={args:{tekst:"<p><strong>Eksempel:</strong></p><ul><li>Første punkt</li><li><em>Andre</em> punkt</li><li>Tredje punkt</li></ul>"}},p={name:"Interaktiv (skriv her)",args:{tekst:"<p>Prøv å skrive / formattere tekst her.</p>",utviklerExtensions:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tekst: '<p>Skriv noe her…</p>'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    skjulToolbar: true,
    tekst: '<p>Toolbar er skjult i denne varianten.</p>'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tekst: '<p>Dette feltet har en feil.</p>',
    feilMelding: 'Du må fylle inn tekst'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    tekst: '<p>Marker en tekst og trykk lenke‑ikonet for å legge til en URL.</p>',
    utviklerExtensions: true
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tekst: '<p><strong>Eksempel:</strong></p><ul><li>Første punkt</li><li><em>Andre</em> punkt</li><li>Tredje punkt</li></ul>'
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Interaktiv (skriv her)',
  args: {
    tekst: '<p>Prøv å skrive / formattere tekst her.</p>',
    utviklerExtensions: true
  }
}`,...p.parameters?.docs?.source}}};export{p as Interaktiv,i as ListeOgFormatering,o as MedFeilmelding,s as MedStartinnhold,n as MedUtviklerExtensions,a as SkjultToolbar,t as Tom,E as default};
