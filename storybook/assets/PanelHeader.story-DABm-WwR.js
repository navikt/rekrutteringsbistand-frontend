import{j as e,d as o}from"./iframe-CVBkVRHF.js";import{P as n,a as t}from"./PanelHeader-DIr3grFT.js";import{T as i}from"./Tabs-BzvfDzRp.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-BK5xoU8o.js";import"./KandidatContext-nUqMfj9c.js";import"./breadcrumb-EehYJUA3.js";import"./Person-Cihu5jLJ.js";import"./Briefcase-Cn1CQ8o8.js";import"./Reception-CKdHEVwB.js";import"./Expand-D4f0gf91.js";import"./Tooltip-C5EcKNFh.js";import"./floating-ui.react-DeZxRt_-.js";import"./Modal.context-BtREQe4S.js";import"./Portal-Bj1bueEp.js";import"./useControllableState-mI0byIJB.js";import"./useDescendant-DynX6z6M.js";import"./useClientLayoutEffect-Cfimm8us.js";import"./ChevronLeft-DJkFOm_g.js";import"./ChevronRight-DbY0nupu.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
