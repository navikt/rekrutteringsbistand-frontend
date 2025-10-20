import{j as e,e as o}from"./iframe-BF8BNn-P.js";import{P as n,a as t}from"./PanelHeader-B8oFjYUe.js";import{T as i}from"./Tabs-C7SbfDkL.js";import"./preload-helper-BWMAHTUm.js";import"./Brødsmuler-DUKRKqvg.js";import"./breadcrumb-8FvfEn6K.js";import"./Person-DNQkHc24.js";import"./Briefcase-Cp1e6OjX.js";import"./Reception-B6WdZqsa.js";import"./Expand-BHgT8EYn.js";import"./useDescendant-ng3Vo_aV.js";import"./useClientLayoutEffect-CVA0Lj03.js";import"./ChevronLeft-KUd3862X.js";import"./ChevronRight-CjLL0MwG.js";import"./useControllableState-CH5q939z.js";const S={tags:["autodocs"],component:n},r={render:()=>e.jsx(n,{children:e.jsx(t,{title:"Tittel",subtitle:"Undertittel"})})},a={render:()=>e.jsx(i,{children:e.jsx(n,{children:e.jsx(t,{title:"Rediger stilling",subtitle:"Oppdatert for 2 min siden",actionsRight:e.jsx(o,{size:"small",children:"Lagre"}),tabs:e.jsxs(e.Fragment,{children:[e.jsx(i.Tab,{value:"tab1",label:"Oversikt"}),e.jsx(i.Tab,{value:"tab2",label:"Aktiviteter"})]})})})})},s={render:()=>e.jsxs(n,{children:[e.jsx(t,{title:"Overordnet seksjon"}),e.jsx(t,{title:"Underseksjon A"}),e.jsx(t,{title:"Underseksjon B"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
} as any`,...s.parameters?.docs?.source}}};export{r as Enkelt,s as FlereSeksjoner,a as MedActionsOgTabs,S as default};
