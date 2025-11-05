import{j as e,d as o}from"./iframe-C0grz2Wo.js";import{P as n,a as t}from"./PanelHeader-BQaJJDdq.js";import{T as i}from"./Tabs-DapCUXNV.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-xetCH8hY.js";import"./KandidatContext-2JrHvzyM.js";import"./breadcrumb-DHGP_Nx2.js";import"./Person-DldkPXYh.js";import"./Briefcase-moWOkM5O.js";import"./Reception-DdJEhxJ3.js";import"./Expand-Rl6rYmej.js";import"./Tooltip-DzaaysOe.js";import"./floating-ui.react-DeVAIk4J.js";import"./Modal.context-DE4oVxi7.js";import"./Portal-CRtarQnA.js";import"./useControllableState-B8wREkvX.js";import"./useDescendant-DKfYsh9H.js";import"./useClientLayoutEffect-CtS8pgi2.js";import"./ChevronLeft-CWLYW61r.js";import"./ChevronRight-DnIlbbje.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
