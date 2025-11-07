import{j as e,d as o}from"./iframe-D_5AEIMH.js";import{P as n,a as t}from"./PanelHeader-BKf-hxFQ.js";import{T as i}from"./Tabs--mk-ypep.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-DtT57uuG.js";import"./KandidatContext-DpPyPrC0.js";import"./breadcrumb-uCcUipu8.js";import"./Person-mDsHERVF.js";import"./Briefcase-C-fc143y.js";import"./Reception-B0z22vmo.js";import"./Expand-DGF1KdFB.js";import"./Tooltip-BT6a24i4.js";import"./floating-ui.react-D6SvponM.js";import"./Modal.context-D728kc9W.js";import"./Portal-L3EL--qL.js";import"./useControllableState-BSJWGsuF.js";import"./useDescendant-CRcgWPAd.js";import"./useClientLayoutEffect-uCjqBNwN.js";import"./ChevronLeft-m_35IwLX.js";import"./ChevronRight-BZnvS-mv.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
