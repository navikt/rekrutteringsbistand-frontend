import{j as e,d as o}from"./iframe-DxFO8IvB.js";import{P as n,a as t}from"./PanelHeader-D5el_Toh.js";import{T as i}from"./Tabs-DCktYyVY.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-BmPESH0u.js";import"./KandidatContext-CrUlSgW1.js";import"./breadcrumb-BbGxVBew.js";import"./Person-BEsnUKUm.js";import"./Briefcase-BLBUGBG_.js";import"./Reception-PW_D1mwX.js";import"./Expand-BoUZtxNK.js";import"./Tooltip-CO1CMVq9.js";import"./floating-ui.react-BGSAD5qD.js";import"./Modal.context-zx_c4c0w.js";import"./Portal-1nYmzj9s.js";import"./useControllableState-CPx_uKRc.js";import"./useDescendant-C-lIABgv.js";import"./useClientLayoutEffect-BkjQOB3H.js";import"./ChevronLeft-veChPlIH.js";import"./ChevronRight-I-S2si1o.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
