import{j as e,d as o}from"./iframe-CEi1Y25_.js";import{P as n,a as t}from"./PanelHeader-DUUUJFLa.js";import{T as i}from"./Tabs-BrHyiakw.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-DXY8EUmj.js";import"./KandidatContext-Bwh265kF.js";import"./breadcrumb-BQqaY32V.js";import"./Person-CrQjmEl_.js";import"./Briefcase-B_vqG6zX.js";import"./Reception-DdCvn3p9.js";import"./Expand-BI22YOKa.js";import"./Tooltip-CZkS_Q0F.js";import"./floating-ui.react-B7ONW0ON.js";import"./Modal.context-vOD-2fLT.js";import"./Portal-Bw0saJbl.js";import"./useControllableState-BYJP4Qy4.js";import"./useDescendant-Ct6WCee5.js";import"./useClientLayoutEffect-DF_7u9uO.js";import"./ChevronLeft-BecxXkjV.js";import"./ChevronRight-Bj3UX8tS.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
