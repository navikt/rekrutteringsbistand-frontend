import{j as e,d as o}from"./iframe-BwFHCbBn.js";import{P as n,a as t}from"./PanelHeader-B_CiHyyi.js";import{T as i}from"./Tabs-fIWV9nT1.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-jSsR0Uqp.js";import"./KandidatContext-Dh6avZLc.js";import"./breadcrumb-CuC4mZd3.js";import"./Person-BxoW4GUy.js";import"./Briefcase-Dxt2oCkD.js";import"./Reception-DAWlbf7Q.js";import"./Expand-DeZf1Xxf.js";import"./Tooltip-mT_aNsHl.js";import"./floating-ui.react-DSt_G1Mr.js";import"./Modal.context-BNG1La1A.js";import"./Portal-DWcXgWfE.js";import"./useControllableState-CK1iRQ76.js";import"./useDescendant-DkCq7a5W.js";import"./useClientLayoutEffect-CiE3Twg0.js";import"./ChevronLeft-DhyPp6oW.js";import"./ChevronRight-BrjDHjsW.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
