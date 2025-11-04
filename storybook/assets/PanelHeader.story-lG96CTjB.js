import{j as e,d as o}from"./iframe-CeRr706s.js";import{P as n,a as t}from"./PanelHeader-BlYnwCOr.js";import{T as i}from"./Tabs-D1ZvEFkg.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-DFMSx8XP.js";import"./KandidatContext-BEyxq5rI.js";import"./breadcrumb-DgODjJcr.js";import"./Person-CNASwxsv.js";import"./Briefcase-JZY_VRt8.js";import"./Reception-CcfRWoRq.js";import"./Expand-D8f1rY8O.js";import"./Tooltip-BWNxkIE_.js";import"./floating-ui.react-a2IcLYZ2.js";import"./Modal.context-CbsAixuf.js";import"./Portal-BtjL7sfS.js";import"./useControllableState-7aLFU1jC.js";import"./useDescendant-DZUSmoVV.js";import"./useClientLayoutEffect-VV1lGVs7.js";import"./ChevronLeft-DsTRd7_W.js";import"./ChevronRight-BZ6vb5ST.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
