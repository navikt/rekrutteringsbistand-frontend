import{j as e,d as o}from"./iframe-BKRDZNXg.js";import{P as n,a as t}from"./PanelHeader-BQ8vfJrt.js";import{T as i}from"./Tabs-zpcWU4h6.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-B3Ap_-zM.js";import"./KandidatContext-BH20GN4f.js";import"./breadcrumb-BNVhX522.js";import"./Person-DG7nPcBw.js";import"./Briefcase-Bzfxzjt_.js";import"./Reception-DvhQkuHQ.js";import"./Expand-Dko4W2Uw.js";import"./Tooltip-qdl_X-XE.js";import"./floating-ui.react-DpAS_Pzz.js";import"./Modal.context-7Ywpz0nY.js";import"./Portal-BpPdkYe3.js";import"./useControllableState-DcIjNWSg.js";import"./useDescendant-CZi4196E.js";import"./useClientLayoutEffect-DHaUvql3.js";import"./ChevronLeft-BRBPsbLz.js";import"./ChevronRight-BqehGXoA.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
