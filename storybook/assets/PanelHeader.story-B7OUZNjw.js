import{j as e,a as o}from"./iframe-BDkGlu2A.js";import{P as n,a as t}from"./PanelHeader-DCn8V8DH.js";import{T as i}from"./Tabs-BFBK5nIF.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CjcUQgCU.js";import"./breadcrumb-CAuhGni4.js";import"./Person-_vvyFekj.js";import"./BriefcaseClock-CPSXviIF.js";import"./Briefcase-D96khn7Y.js";import"./Reception-BcnkPzfc.js";import"./ChevronUp-CqaowGgw.js";import"./ChevronDown-wQ1afhAN.js";import"./Expand-DRpA0DWm.js";import"./Tooltip-B9CoPv1E.js";import"./floating-ui.react-BSApgiA0.js";import"./Modal.context-DYSmtGyK.js";import"./Portal-B956yLNG.js";import"./VStack-DmbEZUe6.js";import"./BasePrimitive-BKHuKnFY.js";import"./useControllableState-SFUimoeF.js";import"./useDescendant-CQ-MnVt3.js";import"./ChevronLeft-CqpL_Oif.js";import"./ChevronRight-xR3TR1_n.js";import"./debounce-Bt9ZE0jI.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
