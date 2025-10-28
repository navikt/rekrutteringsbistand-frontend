import{j as e,d as o}from"./iframe-aLQ-e9Bs.js";import{P as n,a as t}from"./PanelHeader-D1UZhNqz.js";import{T as i}from"./Tabs-CARs8hh7.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CbrTK_4e.js";import"./KandidatContext-oYJ1KN0S.js";import"./breadcrumb-D2MYs07D.js";import"./Person-DyskOkRW.js";import"./Briefcase-CfZxPXW7.js";import"./Reception-B-GpcJ7W.js";import"./Expand-C2sFwHe2.js";import"./Tooltip-JDTk0Oe0.js";import"./floating-ui.react-aWiTZIT7.js";import"./Modal.context-61ODrapt.js";import"./Portal-DIJDLH7D.js";import"./useControllableState-D6h_Nb38.js";import"./useDescendant-Dfnj1lAO.js";import"./useClientLayoutEffect-FMHHNWN1.js";import"./ChevronLeft-B9dh89J9.js";import"./ChevronRight-BS2f13St.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
