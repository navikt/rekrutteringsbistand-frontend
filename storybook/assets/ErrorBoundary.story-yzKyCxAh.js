import{j as e}from"./iframe-Cv24_U16.js";import{E as s}from"./ErrorBoundary-DsPM6IJh.js";import"./preload-helper-BWMAHTUm.js";const t=({message:a})=>{throw new Error(a)},m={tags:["autodocs"],component:s},r={render:()=>e.jsx(s,{children:e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx("h2",{children:"Alt fungerer!"}),e.jsx("p",{children:"Denne komponenten kaster ingen feil."})]})})},n={render:()=>e.jsx(s,{children:e.jsx(t,{message:"Dette er en test-feil!"})})},o={render:()=>e.jsx(s,{children:e.jsx(t,{message:"Dette er en veldig lang feilmelding som beskriver hva som gikk galt i detalj. Den inneholder mye informasjon om konteksten rundt feilen, hva som ble forsøkt, og hvorfor det feilet. Dette kan være nyttig for debugging, men kan også være overveldende for brukeren."})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <ErrorBoundary>
      <div style={{
      padding: '2rem'
    }}>
        <h2>Alt fungerer!</h2>
        <p>Denne komponenten kaster ingen feil.</p>
      </div>
    </ErrorBoundary>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <ErrorBoundary>
      <AlwaysThrowError message='Dette er en test-feil!' />
    </ErrorBoundary>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <ErrorBoundary>
      <AlwaysThrowError message='Dette er en veldig lang feilmelding som beskriver hva som gikk galt i detalj. Den inneholder mye informasjon om konteksten rundt feilen, hva som ble forsøkt, og hvorfor det feilet. Dette kan være nyttig for debugging, men kan også være overveldende for brukeren.' />
    </ErrorBoundary>
}`,...o.parameters?.docs?.source}}};export{n as MedFeil,o as MedLangFeilmelding,r as UtenFeil,m as default};
