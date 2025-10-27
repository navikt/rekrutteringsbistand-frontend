import{j as e,d as o}from"./iframe-BSwZn_oI.js";import{P as n,a as t}from"./PanelHeader-F61C4QHD.js";import{T as i}from"./Tabs-DYy_cLAz.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CP9V9P4j.js";import"./KandidatContext-DjR3njE8.js";import"./breadcrumb-W0rIeQD7.js";import"./Person-DaaPgd8r.js";import"./Briefcase-BnH-VCKJ.js";import"./Reception-Cmgp5ey6.js";import"./Expand-B53fqTCq.js";import"./Tooltip-CFElf7Zm.js";import"./floating-ui.react-D8E_nKxQ.js";import"./Modal.context-ogyKFidp.js";import"./Portal-BwyLqxCh.js";import"./useControllableState-DTLpBcL-.js";import"./useDescendant-DwMa3nEz.js";import"./useClientLayoutEffect-DFm_hYrL.js";import"./ChevronLeft-boNrgXzU.js";import"./ChevronRight-DBivkhDK.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
