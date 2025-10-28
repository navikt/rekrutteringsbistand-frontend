import{j as e,d as o}from"./iframe-D1P1_UW8.js";import{P as n,a as t}from"./PanelHeader-BdtJaQ3n.js";import{T as i}from"./Tabs-CTcxuHl3.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-BbyiEIdJ.js";import"./KandidatContext-CARvR1Ud.js";import"./breadcrumb-CBRNtKOK.js";import"./Person-DzxPffTN.js";import"./Briefcase-CMW8ReIr.js";import"./Reception-DQCqjmSD.js";import"./Expand-BMpxw7Qx.js";import"./Tooltip-CpRm7p9X.js";import"./floating-ui.react-NqINbjK8.js";import"./Modal.context-wTC2bp0_.js";import"./Portal-BY7AdNQA.js";import"./useControllableState-BihhkRmU.js";import"./useDescendant-C4of8rWj.js";import"./useClientLayoutEffect-D6BRyFP4.js";import"./ChevronLeft-C0IfxfEn.js";import"./ChevronRight-BT9KCkdS.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
