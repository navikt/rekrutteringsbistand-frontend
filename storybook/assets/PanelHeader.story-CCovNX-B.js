import{j as e,d as o}from"./iframe-BHOx9B5b.js";import{P as n,a as t}from"./PanelHeader-ByCj4rcL.js";import{T as i}from"./Tabs-BzbrYNg6.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CspgLBMb.js";import"./KandidatContext-B8sTLWl0.js";import"./breadcrumb-BK4vd_NZ.js";import"./Person-C5t17q2z.js";import"./Briefcase-Ba51DH1g.js";import"./Reception-BgQ7qNDs.js";import"./Expand-CXqIU7I8.js";import"./Tooltip-CR7BZIwl.js";import"./floating-ui.react-C7cTNDuv.js";import"./Modal.context-V4MFRuxC.js";import"./Portal-DYaSaokX.js";import"./useControllableState-CMMk7b1o.js";import"./useDescendant-BD6yfJ31.js";import"./useClientLayoutEffect-FxKx5dnQ.js";import"./ChevronLeft-DpDa_Cd7.js";import"./ChevronRight-DqlTV2s0.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
