import{j as e,o}from"./iframe-DjWAYC3X.js";import{P as n,a as t}from"./PanelHeader-Dlc4P_gm.js";import{T as i}from"./Tabs-DHO7RdxQ.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-Cv7FVxc5.js";import"./KandidatContext-Cb0BIGIM.js";import"./breadcrumb-2ry7LPau.js";import"./Person-CxlBvqQQ.js";import"./Briefcase-DU4RF_YV.js";import"./Reception-7cSwcdFX.js";import"./Expand-DwdQZxJQ.js";import"./useDescendant-DApziTPC.js";import"./useClientLayoutEffect-Bu2a2BR2.js";import"./ChevronLeft-BePi3TLC.js";import"./ChevronRight-Q2zHiNqf.js";import"./useControllableState-B_dAdZ-G.js";const h={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
} as any`,...s.parameters?.docs?.source}}};export{r as Enkelt,s as FlereSeksjoner,a as MedActionsOgTabs,h as default};
