import{j as e,H as s,B as r,d as l}from"./iframe-Dztpy7FG.js";import{F as m}from"./Fremdriftspanel-L13rHg3i.js";import{V as a}from"./VStack-HNw6XBKh.js";import"./preload-helper-PPVm8Dsz.js";import"./BasePrimitive-_IOgqcZV.js";const x={tags:["autodocs"],component:m,decorators:[c=>e.jsxs("div",{style:{display:"flex",height:"100vh"},children:[e.jsxs("div",{style:{flex:1,padding:"2rem",background:"var(--ax-surface-default)"},children:[e.jsx(s,{size:"large",children:"Hovedinnhold"}),e.jsx(r,{children:"Dette er hovedinnholdet på siden"})]}),e.jsx(c,{})]})]},n={args:{children:e.jsxs(a,{gap:"4",children:[e.jsx(s,{size:"medium",children:"Fremdrift"}),e.jsx(r,{children:"Dette er innholdet i fremdriftspanelet"})]})}},i={args:{children:e.jsxs(a,{gap:"4",children:[e.jsx(s,{size:"medium",children:"Fremdrift"}),e.jsx(r,{children:"Oppgaver som må fullføres:"}),e.jsxs(a,{gap:"2",children:[e.jsx(l,{variant:"primary",size:"small",children:"Registrer kandidat"}),e.jsx(l,{variant:"secondary",size:"small",children:"Send til arbeidsgiver"}),e.jsx(l,{variant:"tertiary",size:"small",children:"Marker som ferdig"})]})]})}},d={args:{children:e.jsxs(a,{gap:"4",children:[e.jsx(s,{size:"medium",children:"Fremdrift"}),e.jsx(r,{children:"Status for kandidatprosess"}),e.jsx(a,{gap:"3",children:[...Array(10)].map((c,o)=>e.jsxs("div",{style:{padding:"0.5rem",background:"var(--ax-surface-neutral-subtle)",borderRadius:"4px"},children:[e.jsxs(r,{weight:"semibold",children:["Steg ",o+1]}),e.jsxs(r,{size:"small",children:["Beskrivelse av steg ",o+1]})]},o))})]})}},t={args:{children:e.jsxs(a,{gap:"4",children:[e.jsx(s,{size:"medium",children:"Fremdrift"}),e.jsx(r,{children:"Ingen oppgaver å vise"})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Dette er innholdet i fremdriftspanelet</BodyShort>
      </VStack>
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Oppgaver som må fullføres:</BodyShort>
        <VStack gap='2'>
          <Button variant='primary' size='small'>
            Registrer kandidat
          </Button>
          <Button variant='secondary' size='small'>
            Send til arbeidsgiver
          </Button>
          <Button variant='tertiary' size='small'>
            Marker som ferdig
          </Button>
        </VStack>
      </VStack>
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Status for kandidatprosess</BodyShort>
        <VStack gap='3'>
          {[...Array(10)].map((_, i) => <div key={i} style={{
          padding: '0.5rem',
          background: 'var(--ax-surface-neutral-subtle)',
          borderRadius: '4px'
        }}>
              <BodyShort weight='semibold'>Steg {i + 1}</BodyShort>
              <BodyShort size='small'>Beskrivelse av steg {i + 1}</BodyShort>
            </div>)}
        </VStack>
      </VStack>
  }
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Ingen oppgaver å vise</BodyShort>
      </VStack>
  }
}`,...t.parameters?.docs?.source}}};export{n as Default,i as MedHandlinger,d as MedLangtInnhold,t as Tomt,x as default};
