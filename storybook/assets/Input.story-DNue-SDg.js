import{iP as o,j as e,r as c}from"./iframe-DUIlOHDN.js";import{L as n}from"./label-DW0SS4bX.js";import"./preload-helper-BWMAHTUm.js";const x={component:o,tags:["autodocs"],args:{placeholder:"Skriv noe..."}},r={},a={render:s=>e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(n,{htmlFor:"felt",children:"Navn"}),e.jsx(o,{id:"felt",...s})]})},t={render:s=>{const[l,d]=c.useState("Initial");return e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(n,{htmlFor:"kontroll",children:"Kontrollert input"}),e.jsx(o,{id:"kontroll",value:l,onChange:i=>d(i.target.value),...s}),e.jsxs("div",{className:"text-xs text-muted-foreground",children:["Verdi: ",l]})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <div className='flex flex-col gap-2 w-64'>
      <Label htmlFor='felt'>Navn</Label>
      <Input id='felt' {...args} />
    </div>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [verdi, setVerdi] = useState('Initial');
    return <div className='flex flex-col gap-2 w-64'>
        <Label htmlFor='kontroll'>Kontrollert input</Label>
        <Input id='kontroll' value={verdi} onChange={e => setVerdi(e.target.value)} {...args} />
        <div className='text-xs text-muted-foreground'>Verdi: {verdi}</div>
      </div>;
  }
}`,...t.parameters?.docs?.source}}};export{t as Kontrollert,a as MedLabel,r as Standard,x as default};
