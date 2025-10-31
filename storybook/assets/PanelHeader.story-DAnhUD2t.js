import{j as e,d as o}from"./iframe-BieBZBrC.js";import{P as n,a as t}from"./PanelHeader-B0-7vnBk.js";import{T as i}from"./Tabs-ZxIBjxYR.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-BQO_q-C-.js";import"./KandidatContext-BIch5f8X.js";import"./breadcrumb-DETDgN7f.js";import"./Person-CQwXy7M9.js";import"./Briefcase-KJniObXl.js";import"./Reception-C3P0uG9l.js";import"./Expand-pDzJrsOX.js";import"./Tooltip-4dbda1GS.js";import"./floating-ui.react-BT8q7oaF.js";import"./Modal.context-BqRc_p1X.js";import"./Portal-QvoiE7cM.js";import"./useControllableState-DtKQdZJ4.js";import"./useDescendant-CBlcYzGO.js";import"./useClientLayoutEffect-B-LF-TZu.js";import"./ChevronLeft-CN-rhueQ.js";import"./ChevronRight-BI4Fdz4-.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
