import{j as e,H as l,E as g}from"./iframe-BUTH-F7i.js";import{S as u}from"./SideScroll-DjdIn0Eb.js";import{V as m}from"./VStack-Cfx8ef2d.js";import"./preload-helper-PPVm8Dsz.js";import"./style-BCKAgfMU.js";import"./BasePrimitive-EN-WoeUf.js";const y={component:u},c=()=>e.jsx(m,{gap:"4",style:{padding:"2rem"},children:[...Array(30)].map((p,r)=>e.jsxs("div",{style:{padding:"1rem",background:"var(--ax-surface-subtle)",borderRadius:"8px"},children:[e.jsxs(l,{size:"small",spacing:!0,children:["Seksjon ",r+1]}),e.jsxs(g,{children:["Dette er innhold i seksjon ",r+1,". SideScroll komponenten håndterer scrolling automatisk når innholdet er lengre enn det tilgjengelige området."]})]},r))}),h=()=>e.jsx("div",{style:{padding:"2rem"},children:e.jsx("div",{style:{width:"2000px",height:"300px",background:"linear-gradient(90deg, var(--ax-surface-action-subtle) 0%, var(--ax-surface-info-subtle) 100%)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ax-text-on-action)"},children:e.jsx(l,{size:"large",children:"Scroll horisontalt for å se alt innhold"})})}),n={args:{children:e.jsx(c,{})}},a={args:{trimHøyde:300,children:e.jsx(c,{})}},s={args:{enableHorizontalScroll:!0,children:e.jsx(h,{})}},o={args:{autoHeight:!0,children:e.jsx(c,{})}},t={args:{children:e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx(l,{size:"large",spacing:!0,children:"Kort innhold"}),e.jsx(g,{children:"Dette innholdet er kort nok til at scrolling ikke er nødvendig."})]})}},d={args:{className:"bg-surface-neutral-subtle",children:e.jsx(c,{})}},i={args:{enableHorizontalScroll:!0,children:e.jsx("div",{style:{padding:"2rem"},children:e.jsx(m,{gap:"4",children:[...Array(20)].map((p,r)=>e.jsx("div",{style:{width:"2000px",padding:"1rem",background:"var(--ax-surface-subtle)",borderRadius:"8px"},children:e.jsxs(l,{size:"small",children:["Rad ",r+1," - Scroll både vertikalt og horisontalt"]})},r))})})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <LangtInnhold />
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    trimHøyde: 300,
    children: <LangtInnhold />
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    enableHorizontalScroll: true,
    children: <BreddInnhold />
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    autoHeight: true,
    children: <LangtInnhold />
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div style={{
      padding: '2rem'
    }}>
        <Heading size='large' spacing>
          Kort innhold
        </Heading>
        <BodyLong>
          Dette innholdet er kort nok til at scrolling ikke er nødvendig.
        </BodyLong>
      </div>
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'bg-surface-neutral-subtle',
    children: <LangtInnhold />
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    enableHorizontalScroll: true,
    children: <div style={{
      padding: '2rem'
    }}>
        <VStack gap='4'>
          {[...Array(20)].map((_, i) => <div key={i} style={{
          width: '2000px',
          padding: '1rem',
          background: 'var(--ax-surface-subtle)',
          borderRadius: '8px'
        }}>
              <Heading size='small'>
                Rad {i + 1} - Scroll både vertikalt og horisontalt
              </Heading>
            </div>)}
        </VStack>
      </div>
  }
}`,...i.parameters?.docs?.source}}};export{o as AutoHeight,i as BeggeDimensjoner,n as Default,t as KortInnhold,d as MedCustomClassName,s as MedHorizontalScroll,a as MedTrimHøyde,y as default};
