import{r as c,j as n,d as m}from"./iframe-8PA8JIpM.js";import{R as a}from"./RegistrerFåttJobbenKnapp-B_kM4DWh.js";import{A as o}from"./ActionMenu-hC6B_1yq.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-DCGzDLkl.js";import"./Modal.context-D15DMEGj.js";import"./useControllableState-BO1oWSXl.js";import"./Portal-yQAJTGQF.js";import"./useClientLayoutEffect-BuANfnd3.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-DJD3ZnQY.js";import"./Floating-BV2sFdDH.js";import"./useDescendant-CScYp0UO.js";import"./DismissableLayer-D5QKxWcX.js";import"./ChevronRight-5ovCURGO.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
