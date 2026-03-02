import{j as e,c as o}from"./iframe-E6Mm1JGe.js";import{P as n,a as t}from"./PanelHeader-P3zj5X18.js";import{T as i}from"./Tabs-Cyjb7Rfw.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CdbVJZRK.js";import"./breadcrumb-lU3I481T.js";import"./Person-Dcj-fyQT.js";import"./BriefcaseClock-BsbXwbLi.js";import"./Briefcase-D1FthToh.js";import"./Reception-CPUdiVyq.js";import"./ChevronUp-CC3wH8PR.js";import"./ChevronDown-hkgGS8Es.js";import"./Expand-iNkH0uaX.js";import"./Tooltip-CbgjxtoN.js";import"./floating-ui.react-BpFkhjzh.js";import"./Modal.context-BPi-odSy.js";import"./Portal-BdF9mHc8.js";import"./VStack-DcyqGAQ6.js";import"./BasePrimitive-DSSGc3uz.js";import"./useControllableState-D5-hTvpA.js";import"./useDescendant-BMHVH1hS.js";import"./ChevronLeft-DjuyJc9W.js";import"./ChevronRight-Calttabz.js";import"./debounce-BYPOl3GS.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
