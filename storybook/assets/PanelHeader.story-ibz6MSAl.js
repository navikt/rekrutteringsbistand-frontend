import{j as e,d as o}from"./iframe-YU0gJw2_.js";import{P as n,a as t}from"./PanelHeader-DLKYHZVO.js";import{T as i}from"./Tabs-vcml-R-8.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-B71GQZuN.js";import"./KandidatContext-BlFZ4Qyg.js";import"./breadcrumb-BjjlHgPq.js";import"./Person-B1XgZ_j7.js";import"./Briefcase-Cld3sUpf.js";import"./Reception-D5gF4pqR.js";import"./Expand-D50zsulg.js";import"./Tooltip-BueAHl_R.js";import"./floating-ui.react-B-ydokDH.js";import"./Modal.context-DZ6x1Rgu.js";import"./Portal-DDuTG0Sp.js";import"./useControllableState-CZk7ILKn.js";import"./useDescendant-DsPvMWAh.js";import"./useClientLayoutEffect-vqMtOR5G.js";import"./ChevronLeft-COoVPjni.js";import"./ChevronRight-BcvIcDvj.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
