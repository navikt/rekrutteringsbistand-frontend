import{j as e,d as o}from"./iframe-DenWKEC9.js";import{P as n,a as t}from"./PanelHeader-D2ooD78v.js";import{T as i}from"./Tabs-BZUXSgKx.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-C3xgNLcj.js";import"./KandidatContext-LHFr_4l3.js";import"./breadcrumb-VM9EwiRl.js";import"./Person-Bvm8Hzdo.js";import"./Briefcase-B0np80Eu.js";import"./Reception-CBAddrV3.js";import"./Expand-DMkUji6L.js";import"./Tooltip-DnMs1P8H.js";import"./floating-ui.react-C8po_Knd.js";import"./Modal.context-Dz6HeStX.js";import"./Portal-BdqQ_UWT.js";import"./useControllableState-DjghFc1P.js";import"./useDescendant-B-WMW2Zy.js";import"./useClientLayoutEffect-DBad4hBW.js";import"./ChevronLeft-ASm2sbkF.js";import"./ChevronRight-90f83Bjx.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
