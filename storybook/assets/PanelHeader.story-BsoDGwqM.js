import{j as e,c as o}from"./iframe-CC6VL7_i.js";import{P as n,a as t}from"./PanelHeader-CYSdGqwX.js";import{T as i}from"./Tabs-BYpXY7p4.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-Br06c6Mp.js";import"./breadcrumb-CB1Bu7gf.js";import"./Person-Z6gOkD2y.js";import"./BriefcaseClock-CCIonKF6.js";import"./Briefcase-CBH4yKhM.js";import"./Reception-ZLRofjoF.js";import"./ChevronUp-BNu4K6uX.js";import"./ChevronDown-WhTQzULd.js";import"./Expand-C_tQQCnK.js";import"./Tooltip-Bw-0yiRZ.js";import"./floating-ui.react-098Ic5Zf.js";import"./Modal.context-B9dQfTWE.js";import"./Portal-CtmUbKL1.js";import"./VStack-JqhHne0b.js";import"./BasePrimitive-BAiSlWT1.js";import"./useControllableState-WjbrG42K.js";import"./useDescendant-QvI7K5q0.js";import"./ChevronLeft-D_eXYigO.js";import"./ChevronRight-Be0CdRdy.js";import"./debounce-BrVCzYDy.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
