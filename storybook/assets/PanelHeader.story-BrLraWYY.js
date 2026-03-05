import{j as e,a as o}from"./iframe-_cKBTLnw.js";import{P as n,a as t}from"./PanelHeader-T-Z9pjsU.js";import{T as i}from"./Tabs-VzjK3I0b.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-C_iyx8Hd.js";import"./breadcrumb-D76HEEhJ.js";import"./Person-WeecI-31.js";import"./BriefcaseClock-D1e3zkgr.js";import"./Briefcase-DWGH-fJa.js";import"./Reception-DGHy1NIF.js";import"./ChevronUp-DKadikiN.js";import"./ChevronDown-D7XmsMiw.js";import"./Expand-DQBZpgFi.js";import"./Tooltip-cw8LUhHO.js";import"./floating-ui.react-Cdc_p7Sm.js";import"./Modal.context-DgbU6aMT.js";import"./Portal-sHmli58Y.js";import"./VStack-BtbW7w57.js";import"./BasePrimitive-C5jwIYOF.js";import"./useControllableState-DuwAMkuq.js";import"./useDescendant-D-PJKYt_.js";import"./ChevronLeft-PzEJE7j7.js";import"./ChevronRight-Ct-Avnze.js";import"./debounce-DCv8Pzn8.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
