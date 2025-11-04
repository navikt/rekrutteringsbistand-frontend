import{j as e,d as o}from"./iframe-KUKdFIZ7.js";import{P as n,a as t}from"./PanelHeader-BHqHIu3l.js";import{T as i}from"./Tabs-DdSMztl8.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-qW8bKxto.js";import"./KandidatContext-BLE492Dm.js";import"./breadcrumb-Bm1YcGpO.js";import"./Person-NOYObN5r.js";import"./Briefcase-Bqcal6An.js";import"./Reception-CMskPuOg.js";import"./Expand-B4qNVYT3.js";import"./Tooltip-BXMaDL1A.js";import"./floating-ui.react-Chb98_y2.js";import"./Modal.context-B64mO1CY.js";import"./Portal-Du4L2QaB.js";import"./useControllableState-B4PYToqo.js";import"./useDescendant-DtlgqquC.js";import"./useClientLayoutEffect-Wu0zOuyx.js";import"./ChevronLeft-CWCkJlKc.js";import"./ChevronRight-CFQxBWoL.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
