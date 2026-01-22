import{r as c,j as n,d as m}from"./iframe-CAw-ouFU.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Cq8gYyZO.js";import{A as o}from"./ActionMenu-Drd5s0jP.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Cp4GQlcb.js";import"./Modal.context-CwD_lHOd.js";import"./useControllableState-BkJ0YlGV.js";import"./Portal-CeqU7nZP.js";import"./useClientLayoutEffect-D6WqdrFI.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-B-4EPICH.js";import"./Floating-Dq_vswri.js";import"./useDescendant-BFS4G8mj.js";import"./DismissableLayer-DqRfWjts.js";import"./ChevronRight-4JfF_wiD.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
