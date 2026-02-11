import{r as c,j as n,d as m}from"./iframe-D2qk06b9.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CoMzXaEV.js";import{A as o}from"./ActionMenu-BIRB_Ejo.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-BmulpJKq.js";import"./Modal.context-HFXbj7pd.js";import"./useControllableState-DW-IcaiN.js";import"./Portal-BhTj2bdE.js";import"./useClientLayoutEffect-CAHRMErA.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-j9mC_0Wh.js";import"./Floating-BuMAPCPH.js";import"./useDescendant-z8f6DXoh.js";import"./DismissableLayer-Cl6K_98h.js";import"./ChevronRight-Dso_-qwW.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
