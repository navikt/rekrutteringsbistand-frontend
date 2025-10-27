import{j as e,d as o}from"./iframe-DGJZfRLj.js";import{P as n,a as t}from"./PanelHeader-C3bFBTSG.js";import{T as i}from"./Tabs-i5eeWnNu.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-Du3NuGtw.js";import"./KandidatContext-BCbVFQhz.js";import"./breadcrumb-Gvh5UEjn.js";import"./Person-BHEbv_Rd.js";import"./Briefcase-BDvbi82u.js";import"./Reception-BpJdaehj.js";import"./Expand-DreTPy7s.js";import"./Tooltip-CzxQFLYn.js";import"./floating-ui.react-BBlmzmSN.js";import"./Modal.context-DMB1oKZj.js";import"./Portal-BNwPUP_W.js";import"./useControllableState-V_CYkDBC.js";import"./useDescendant-D-o2dfrc.js";import"./useClientLayoutEffect-D8AEg2Kf.js";import"./ChevronLeft-BWuILOzN.js";import"./ChevronRight-DNfVh4gM.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
