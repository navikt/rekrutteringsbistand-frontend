import{j as e,c as o}from"./iframe-DFtwoTh_.js";import{P as n,a as t}from"./PanelHeader-DHa0MdsH.js";import{T as i}from"./Tabs-qIwnK7Dm.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-3ZHVTYVr.js";import"./breadcrumb-CIzlGfMx.js";import"./Person-D5M1Juhg.js";import"./BriefcaseClock-B9lHSdh1.js";import"./Briefcase-BWCCANPk.js";import"./Reception-B4DalNiz.js";import"./ChevronUp-Cfs4rr-l.js";import"./ChevronDown-BAdGgiDq.js";import"./Expand-kM1rb-az.js";import"./Tooltip-C5uIy07R.js";import"./floating-ui.react-BeotM2gb.js";import"./Modal.context-BnWAHEQc.js";import"./Portal-DDM1AoJr.js";import"./VStack-BXRFfnuf.js";import"./BasePrimitive-CDiUHIiY.js";import"./useControllableState-b9V7-pUK.js";import"./useDescendant-DLRNTQnQ.js";import"./ChevronLeft-C5I3X_U7.js";import"./ChevronRight-C2q2gpJB.js";import"./debounce-lMz_vNcw.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
