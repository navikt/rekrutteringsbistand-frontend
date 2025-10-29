import{j as e,d as o}from"./iframe-Bietwq5R.js";import{P as n,a as t}from"./PanelHeader-xYs9hy6s.js";import{T as i}from"./Tabs-BskDZGN7.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CuF7U7SC.js";import"./KandidatContext-CbAdxTsf.js";import"./breadcrumb-CKQu0AkE.js";import"./Person-gWfQVbp7.js";import"./Briefcase-B7Wtqwzl.js";import"./Reception-UHDRqQli.js";import"./Expand-Dd1faTyc.js";import"./Tooltip-P6Gac63O.js";import"./floating-ui.react-Dg8nhyeA.js";import"./Modal.context-DqcrTTpA.js";import"./Portal-CAW-evOe.js";import"./useControllableState-B1O8h9rV.js";import"./useDescendant-C6a7rGIS.js";import"./useClientLayoutEffect-RC2vySZb.js";import"./ChevronLeft-CLmgdilY.js";import"./ChevronRight-Cqhzy8AI.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <PanelHeader>
      <PanelHeaderSection title='Tittel' subtitle='Undertittel' />
    </PanelHeader>
} as any`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs>
      <PanelHeader>
        <PanelHeaderSection title='Rediger stilling' subtitle='Oppdatert for 2 min siden' actionsRight={<Button size='small'>Lagre</Button>} tabs={<>
              <Tabs.Tab value={'tab1'} label='Oversikt' />
              <Tabs.Tab value={'tab2'} label='Aktiviteter' />
            </>} />
      </PanelHeader>
    </Tabs>
} as any`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <PanelHeader>
      <PanelHeaderSection title='Overordnet seksjon' />
      <PanelHeaderSection title='Underseksjon A' />
      <PanelHeaderSection title='Underseksjon B' />
    </PanelHeader>
} as any`,...s.parameters?.docs?.source}}};export{r as Enkelt,s as FlereSeksjoner,a as MedActionsOgTabs,A as default};
