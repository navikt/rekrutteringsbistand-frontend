import{j as e,d as o}from"./iframe-cL8k691U.js";import{P as n,a as t}from"./PanelHeader-DgPZcyRo.js";import{T as i}from"./Tabs-BVqERzwz.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-09J_a54j.js";import"./KandidatContext-CPy9uMlV.js";import"./breadcrumb-CQIOoNhQ.js";import"./Person-B8BkpVtS.js";import"./Briefcase-CbD_LO1f.js";import"./Reception-B10YGPzZ.js";import"./Expand-BpmU59-9.js";import"./Tooltip-C1VwszQR.js";import"./floating-ui.react-DfESSBbJ.js";import"./Modal.context-BJG8Br9n.js";import"./Portal-C8Tuvinc.js";import"./useControllableState-DTJY2lFz.js";import"./useDescendant-Cn-T47ra.js";import"./useClientLayoutEffect-DUQJUa8d.js";import"./ChevronLeft-BdSUZYko.js";import"./ChevronRight-Cy4DCmwH.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
