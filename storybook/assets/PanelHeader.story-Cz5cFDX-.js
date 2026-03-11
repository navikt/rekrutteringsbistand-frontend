import{j as e,a as o}from"./iframe-B9EIERAQ.js";import{P as n,a as t}from"./PanelHeader-B8fvi35m.js";import{T as i}from"./Tabs-KXx4IMBv.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-2TGCH60o.js";import"./breadcrumb-CxH3QqM6.js";import"./Person-BeEyg6If.js";import"./BriefcaseClock-B-ZfesLk.js";import"./Briefcase-BcUCLn7C.js";import"./Reception-01CVxBB6.js";import"./ChevronUp-HnFgfijA.js";import"./ChevronDown-c0esv8A1.js";import"./Expand-BelXMV6B.js";import"./Tooltip-7CKPs9cK.js";import"./floating-ui.react-BoG6eMh5.js";import"./Modal.context-BLDLPEvc.js";import"./Portal-Bbmc0y0W.js";import"./VStack-Dy4xRJaM.js";import"./BasePrimitive-okBwE8Ge.js";import"./useControllableState-UfBjBAk3.js";import"./useDescendant-Snxu4iZa.js";import"./ChevronLeft-COiB5r4q.js";import"./ChevronRight-Czcdu2Do.js";import"./debounce-BZn7Sf7B.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
