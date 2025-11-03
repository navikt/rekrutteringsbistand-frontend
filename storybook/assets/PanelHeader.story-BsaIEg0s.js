import{j as e,d as o}from"./iframe-CQ6vvEeK.js";import{P as n,a as t}from"./PanelHeader-DZF6YVJh.js";import{T as i}from"./Tabs-BZvz0BMf.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-Dp6_bc6g.js";import"./KandidatContext-Dj0BV6dd.js";import"./breadcrumb-dXOj6elT.js";import"./Person-BEQRNb58.js";import"./Briefcase-D9RVszqi.js";import"./Reception-Bsv3f4Ab.js";import"./Expand-BKUcAlqY.js";import"./Tooltip-DqYr3hL0.js";import"./floating-ui.react-q6qfomDA.js";import"./Modal.context-BLjCIKII.js";import"./Portal-CBnPcAZ4.js";import"./useControllableState-B4ZbH_WK.js";import"./useDescendant-AZdzncnu.js";import"./useClientLayoutEffect-DY3UtHGC.js";import"./ChevronLeft-DxMItxdt.js";import"./ChevronRight-B5MYPCXi.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
