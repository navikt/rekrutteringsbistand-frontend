import{j as e,d as o}from"./iframe-Dx5p-74P.js";import{P as n,a as t}from"./PanelHeader-1VVSlwQl.js";import{T as i}from"./Tabs-tI4HuJD0.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CsmEJW2n.js";import"./KandidatContext-B78mtwrt.js";import"./breadcrumb-Ck22uO61.js";import"./Person-Bsg-Nmky.js";import"./Briefcase-4OgP9gji.js";import"./Reception-DgoF5Qer.js";import"./Expand-UPFDmgQX.js";import"./Tooltip-oPXX3iBI.js";import"./floating-ui.react-1bRgyrJ9.js";import"./Modal.context-TxvMfdUR.js";import"./Portal-D64R4Cmn.js";import"./useControllableState-BHffPqA3.js";import"./useDescendant-BjBks9Ie.js";import"./useClientLayoutEffect-D5-QfL8A.js";import"./ChevronLeft-Cdfpi0WZ.js";import"./ChevronRight-DHqPh0IE.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
