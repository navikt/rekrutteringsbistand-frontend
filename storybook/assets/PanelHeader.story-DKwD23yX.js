import{j as e,d as o}from"./iframe-C8jcw7Cb.js";import{P as n,a as t}from"./PanelHeader-2I8AqayY.js";import{T as i}from"./Tabs-CPVzrWhL.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-bN7Xyoku.js";import"./KandidatContext-BIlHrbBl.js";import"./breadcrumb-eCD7byJn.js";import"./Person-C2A53lD4.js";import"./Briefcase-qeFr_GSk.js";import"./Reception-CBxXnrTK.js";import"./Expand-DgkXLoXl.js";import"./Tooltip-t2CseeqN.js";import"./floating-ui.react-BmbGXzjv.js";import"./Modal.context-DvXrykWw.js";import"./Portal-BMuERbjK.js";import"./useControllableState-BUOfQ_y2.js";import"./useDescendant-DOBRuPMz.js";import"./useClientLayoutEffect-CidqHgOF.js";import"./ChevronLeft-BwEgIgCM.js";import"./ChevronRight-fFUI5Z_W.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
