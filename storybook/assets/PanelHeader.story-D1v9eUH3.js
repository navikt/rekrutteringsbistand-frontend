import{j as e,d as o}from"./iframe-D2Aj6zCc.js";import{P as n,a as t}from"./PanelHeader-CqHP0IJf.js";import{T as i}from"./Tabs-CnKru9nF.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CMwg-7tg.js";import"./KandidatContext-OJRNxRZ0.js";import"./breadcrumb-D1c3l191.js";import"./Person-DSnzgW-w.js";import"./Briefcase-DXjR3Y1W.js";import"./Reception-CIeusvrJ.js";import"./Expand-CYpO6LAV.js";import"./Tooltip-CZ15AkBV.js";import"./floating-ui.react-C0SACjvL.js";import"./Modal.context-DAf4bnRZ.js";import"./Portal-DRXTOwzF.js";import"./useControllableState-Bhz5eiw1.js";import"./useDescendant-DFZv9C6i.js";import"./useClientLayoutEffect-CijJ4uQ4.js";import"./ChevronLeft-BbzQEs7_.js";import"./ChevronRight-BX2CxrmU.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
