import{j as e,d as o}from"./iframe-BFw6Y54_.js";import{P as n,a as t}from"./PanelHeader-CIpWRGBV.js";import{T as i}from"./Tabs-DssIhDLf.js";import"./preload-helper-PPVm8Dsz.js";import"./Brødsmuler-CgWROKLi.js";import"./KandidatContext-DtZN2Bqo.js";import"./breadcrumb-CjfBIcLA.js";import"./Person-DZIpkDUA.js";import"./Briefcase-CvKuRhAK.js";import"./Reception-C9NTKYRy.js";import"./Expand-DInqeC1B.js";import"./Tooltip-CJqMxvIh.js";import"./floating-ui.react-CzAqc4TG.js";import"./Modal.context-CM0EOp7U.js";import"./Portal-DZQDbMh5.js";import"./useControllableState-CMcPgaqx.js";import"./useDescendant-Bq6m2cMW.js";import"./useClientLayoutEffect-CHDvLUxV.js";import"./ChevronLeft-B7bNFFZw.js";import"./ChevronRight-CC52nqo3.js";const A={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
