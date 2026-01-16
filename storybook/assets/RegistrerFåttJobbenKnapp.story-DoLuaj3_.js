import{r as c,j as n,d as m}from"./iframe-Ik8kw4Ju.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CkEDdJ1y.js";import{A as o}from"./ActionMenu-CIz27ECM.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Bh9wF6j_.js";import"./Modal.context-paBkLDd3.js";import"./useControllableState-p63OqQmu.js";import"./Portal-DWrpsNfA.js";import"./useClientLayoutEffect-CPiUCbX0.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-C0uG3_ei.js";import"./useDescendant-DdjiYu7_.js";import"./DismissableLayer-OgsdA99v.js";import"./Floating-D4hvQZV3.js";import"./ChevronRight-DdrzI6hY.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <RegistrerFåttJobbenKnapp actionMenu {...args} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,b as default};
