import{j as e,c as o}from"./iframe-FHkBCfVU.js";import{P as n,a as t}from"./PanelHeader-BJBNCLlf.js";import{T as i}from"./Tabs-CWO9Rx8R.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CcDz_LjV.js";import"./breadcrumb-BwbY3Jea.js";import"./Person-DkluMU29.js";import"./BriefcaseClock-BTvD6Kf_.js";import"./Briefcase-CNf_Vg-b.js";import"./Reception-DVY19QyZ.js";import"./ChevronUp-cjGVNZiG.js";import"./ChevronDown-3uAeWOI_.js";import"./Expand-BLX0_Qsd.js";import"./Tooltip-ByANt3Pk.js";import"./floating-ui.react-CQO1Gy8D.js";import"./Modal.context-DfI42K82.js";import"./Portal-CwAZzS7w.js";import"./VStack-C2l0CBZp.js";import"./BasePrimitive-AqEGMIdf.js";import"./useControllableState-C70irtDf.js";import"./useDescendant-COL2doGN.js";import"./ChevronLeft-DMbWa2cs.js";import"./ChevronRight-CmKJcyXI.js";import"./debounce-BIgYE1zQ.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
} as any`,...s.parameters?.docs?.source}}};export{r as Enkelt,s as FlereSeksjoner,a as MedActionsOgTabs,z as default};
