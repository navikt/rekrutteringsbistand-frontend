import{j as e,c as o}from"./iframe-BPmgH2Tx.js";import{P as n,a as t}from"./PanelHeader-wYX2T9xg.js";import{T as i}from"./Tabs-Bj5twyEs.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-4cPFrfMv.js";import"./breadcrumb-CUUhJg7e.js";import"./Person-B7kl2TtX.js";import"./BriefcaseClock-kj4afu9X.js";import"./Briefcase-BTRCrBrJ.js";import"./Reception-DtKhs4N3.js";import"./ChevronUp-DZVyXJOC.js";import"./ChevronDown-CD2_VJq7.js";import"./Expand-B98-UN7Z.js";import"./Tooltip-CG3Ql4F8.js";import"./floating-ui.react-D2LCOjcf.js";import"./Modal.context-Dp2nafXs.js";import"./Portal-Dw-ceXxH.js";import"./VStack-FkDzzsLz.js";import"./BasePrimitive-oP1t9L8b.js";import"./useControllableState-NeFzMEdM.js";import"./useDescendant-UJlNggKp.js";import"./ChevronLeft-D2C6MFHi.js";import"./ChevronRight-CKRtm_Lt.js";import"./debounce-DygqG6n4.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
} as any`,...s.parameters?.docs?.source}}};export{r as Enkelt,s as FlereSeksjoner,a as MedActionsOgTabs,z as default};
