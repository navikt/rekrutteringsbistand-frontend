import{j as e,d as o}from"./iframe-Db4gm7sv.js";import{P as n,a as t}from"./PanelHeader-CxGD93Nk.js";import{T as i}from"./Tabs-BDyef-Mu.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-WCu13mda.js";import"./KandidatContext-BKWX4pTI.js";import"./breadcrumb-Daqv94_4.js";import"./Person-Df0tQuW7.js";import"./Briefcase-DPpon744.js";import"./Reception-Bh6fUHUG.js";import"./Expand-Dz436Yds.js";import"./Tooltip-DwR_G7Ks.js";import"./floating-ui.react-DQrCiaXj.js";import"./Modal.context-_lDx5AbH.js";import"./Portal-BwjZ2tSD.js";import"./useControllableState-BzElCyNZ.js";import"./useDescendant-Ba2aSA-P.js";import"./useClientLayoutEffect-DD-jHHhO.js";import"./ChevronLeft-C3WD-Ubw.js";import"./ChevronRight-vBY-whxn.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
