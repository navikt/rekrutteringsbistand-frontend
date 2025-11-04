import{j as e,d as o}from"./iframe-BqqySmLp.js";import{P as n,a as t}from"./PanelHeader-CTuYK_is.js";import{T as i}from"./Tabs-DzCZfMOv.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-C6eKrtlj.js";import"./KandidatContext-jYEz34tE.js";import"./breadcrumb-BirgHLkz.js";import"./Person-BqFZbuBs.js";import"./Briefcase-BYBvlhuk.js";import"./Reception-QGNHdyS4.js";import"./Expand-vOXO-2Tv.js";import"./Tooltip-BF7xYvk6.js";import"./floating-ui.react-B-xuQX2d.js";import"./Modal.context-CnB7G1fS.js";import"./Portal-DdbpEvzU.js";import"./useControllableState-CEMIviyc.js";import"./useDescendant-BLkzZ4qU.js";import"./useClientLayoutEffect-Bb3HpSJf.js";import"./ChevronLeft-CkZLM9Dd.js";import"./ChevronRight-BxIRWRPq.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
