import{j as e,d as o}from"./iframe-B_4Bmvgq.js";import{P as n,a as t}from"./PanelHeader-C9mc1FKA.js";import{T as i}from"./Tabs-CfV4_BsI.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-dyCSZm9v.js";import"./KandidatContext-BLN_yZn-.js";import"./breadcrumb-CxrYVDe5.js";import"./Person-DYNWx06j.js";import"./Briefcase-BvayXByi.js";import"./Reception-DVpc_34e.js";import"./Expand-ChnJ76rX.js";import"./Tooltip-DcKJe89f.js";import"./floating-ui.react-DvaqMJwp.js";import"./Modal.context-BqzOV7AP.js";import"./Portal-Bx_Rqpua.js";import"./useControllableState-W5agygci.js";import"./useDescendant-BRdXeAaX.js";import"./useClientLayoutEffect-BYRGBLGK.js";import"./ChevronLeft-B__QwsPs.js";import"./ChevronRight-B2DUC9st.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
