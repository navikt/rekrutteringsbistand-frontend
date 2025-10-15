import{V as l}from"./VisEditorTekst-BZDcvz_S.js";import"./iframe-vr_vckGk.js";import"./preload-helper-BWMAHTUm.js";const m={tags:["autodocs"],component:l},e={args:{htmlTekst:""}},s={args:{htmlTekst:"<p>Dette er en enkel avsnittstekst med litt <strong>utheving</strong>.</p>"}},t={args:{htmlTekst:`
      <h1>Stor hovedoverskrift</h1>
      <p>Innledningstekst.</p>
      <h2>Seksjon</h2>
      <p>Litt tekst i en seksjon.</p>
      <h3>Underseksjon</h3>
      <p>Mer tekst.</p>
    `}},r={args:{htmlTekst:`
      <p>Under ser du en liste:</p>
      <ul>
        <li>Første punkt</li>
        <li>Andre punkt med <strong>utheving</strong></li>
        <li><a href='https://www.nav.no'>Lenke til nav.no</a></li>
      </ul>
      <p>Og en ordnet liste:</p>
      <ol>
        <li>Steg en</li>
        <li>Steg to</li>
      </ol>
    `}},n={args:{htmlTekst:123456}},o={args:{htmlTekst:`
      <h2>Stillingsbeskrivelse</h2>
      <p>Vi ser etter en person som:</p>
      <ul>
        <li>Er nysgjerrig</li>
        <li>Liker å jobbe i team</li>
        <li>Bygger robuste løsninger</li>
      </ul>
      <p>Ta kontakt for spørsmål.</p>
    `}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: ''
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: '<p>Dette er en enkel avsnittstekst med litt <strong>utheving</strong>.</p>'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: \`
      <h1>Stor hovedoverskrift</h1>
      <p>Innledningstekst.</p>
      <h2>Seksjon</h2>
      <p>Litt tekst i en seksjon.</p>
      <h3>Underseksjon</h3>
      <p>Mer tekst.</p>
    \`
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: \`
      <p>Under ser du en liste:</p>
      <ul>
        <li>Første punkt</li>
        <li>Andre punkt med <strong>utheving</strong></li>
        <li><a href='https://www.nav.no'>Lenke til nav.no</a></li>
      </ul>
      <p>Og en ordnet liste:</p>
      <ol>
        <li>Steg en</li>
        <li>Steg to</li>
      </ol>
    \`
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: 123456
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    htmlTekst: \`
      <h2>Stillingsbeskrivelse</h2>
      <p>Vi ser etter en person som:</p>
      <ul>
        <li>Er nysgjerrig</li>
        <li>Liker å jobbe i team</li>
        <li>Bygger robuste løsninger</li>
      </ul>
      <p>Ta kontakt for spørsmål.</p>
    \`
  }
}`,...o.parameters?.docs?.source}}};export{s as EnkelTekst,o as KompleksInnhold,r as ListerOgLenker,t as MedOverskrifter,n as TallSomInput,e as Tom,m as default};
