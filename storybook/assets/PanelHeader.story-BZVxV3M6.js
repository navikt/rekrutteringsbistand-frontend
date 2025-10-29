import{j as e,d as o}from"./iframe-BvvhrRbe.js";import{P as n,a as t}from"./PanelHeader-VO6n1ytL.js";import{T as i}from"./Tabs-vBGPoaeP.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-B0Lb29C6.js";import"./KandidatContext-DP5FuplU.js";import"./breadcrumb-KAghTv40.js";import"./Person-DwDYxG40.js";import"./Briefcase-CbZC-5Xq.js";import"./Reception-C0BEIObS.js";import"./Expand-L1DNMD00.js";import"./Tooltip--Sel_9QR.js";import"./floating-ui.react-BfNC0LZR.js";import"./Modal.context-BcwzVHgg.js";import"./Portal-C4Zfnjpp.js";import"./useControllableState-B5f92340.js";import"./useDescendant-y-KejPye.js";import"./useClientLayoutEffect-KrIuP9uz.js";import"./ChevronLeft-asuIzmqe.js";import"./ChevronRight-BP12pIbF.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
