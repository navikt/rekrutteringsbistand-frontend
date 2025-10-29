import{j as e,d as o}from"./iframe-CWsprw3t.js";import{P as n,a as t}from"./PanelHeader-Cyx-C1Kz.js";import{T as i}from"./Tabs-BEtZdK7h.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-wFM4hFDt.js";import"./KandidatContext-DE1MboNs.js";import"./breadcrumb-BmcCzaeA.js";import"./Person-DrLP5j6f.js";import"./Briefcase-DluerfHO.js";import"./Reception-CHZfopJm.js";import"./Expand-6ZyQCF3Q.js";import"./Tooltip-xJiKVTLA.js";import"./floating-ui.react-Ct5t2oiB.js";import"./Modal.context-DQJtZMa6.js";import"./Portal-BmS7RfVq.js";import"./useControllableState-DMcbZf6j.js";import"./useDescendant-DpSCI0s7.js";import"./useClientLayoutEffect-BDsETyEK.js";import"./ChevronLeft-CKO9plQB.js";import"./ChevronRight-wRxJHKe-.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
