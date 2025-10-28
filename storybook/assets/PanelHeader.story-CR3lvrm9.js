import{j as e,d as o}from"./iframe-vxlhYioC.js";import{P as n,a as t}from"./PanelHeader-C44ugU1o.js";import{T as i}from"./Tabs-CElqr7QR.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-Dto_UYD6.js";import"./KandidatContext-Bx6A7y14.js";import"./breadcrumb-DBErklCX.js";import"./Person-D9XzLz9L.js";import"./Briefcase-B-Pp640L.js";import"./Reception-bFfKNGtW.js";import"./Expand-CsFBsQr6.js";import"./Tooltip-DAeDNLrx.js";import"./floating-ui.react-NB48aGkL.js";import"./Modal.context-1XeiDYLf.js";import"./Portal-C2HD5bCt.js";import"./useControllableState-C8bmfjbm.js";import"./useDescendant-BEvTWtx7.js";import"./useClientLayoutEffect-CAAJPNEI.js";import"./ChevronLeft-BPH9E5SY.js";import"./ChevronRight-V5n2EVuR.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
