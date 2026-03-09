import{j as e,a as o}from"./iframe-BZVnfrYv.js";import{P as n,a as t}from"./PanelHeader-DRpkcmZ4.js";import{T as i}from"./Tabs-v0Q17CCx.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-DITUoizc.js";import"./breadcrumb-CwWgSd2s.js";import"./Person-Cmcvi5kB.js";import"./BriefcaseClock-DdI9JUeJ.js";import"./Briefcase-CgFEz-07.js";import"./Reception-BTH6gXQx.js";import"./ChevronUp-LwdlHWmm.js";import"./ChevronDown-C55970Qm.js";import"./Expand-BbPydACM.js";import"./Tooltip-Dy4uzitU.js";import"./floating-ui.react-CRYv7j3Z.js";import"./Modal.context-DdxXfQQV.js";import"./Portal-C5FvaPgs.js";import"./VStack-DRl8vrOc.js";import"./BasePrimitive-e3pbX_Cv.js";import"./useControllableState-4LOe-ma9.js";import"./useDescendant-W9w55j2l.js";import"./ChevronLeft--N9Kk5iO.js";import"./ChevronRight-CFeQqwBT.js";import"./debounce-jvFFbXCM.js";const z={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
