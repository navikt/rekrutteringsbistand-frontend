import{j as e,a as o}from"./iframe-BPSD_YT1.js";import{P as n,a as t}from"./PanelHeader-DdOBKPcF.js";import{T as i}from"./Tabs-Dlzx72kA.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-q3Zu-xEP.js";import"./breadcrumb-DdNSg9d8.js";import"./Person-DMzuAtKA.js";import"./BriefcaseClock-Cgs5r6_v.js";import"./Briefcase-h5CgPaCV.js";import"./Reception-KJBv6Msn.js";import"./ChevronUp-5KvWsJka.js";import"./ChevronDown-DjXa-Zxo.js";import"./Expand-B4ou8dlM.js";import"./Tooltip-t30Mlp1F.js";import"./floating-ui.react-D5gzGk-9.js";import"./Modal.context-DvEzp0QD.js";import"./Portal-BgAknobq.js";import"./VStack-C67QtXfD.js";import"./BasePrimitive-8nTlBWV_.js";import"./useControllableState-_KJ3yXDg.js";import"./useDescendant-5d9VxkGW.js";import"./ChevronLeft-BeAdOL5t.js";import"./ChevronRight-DuU4S5br.js";import"./debounce-B__uEQ8g.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
