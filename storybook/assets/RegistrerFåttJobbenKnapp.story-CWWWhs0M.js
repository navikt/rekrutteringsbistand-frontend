import{r as c,j as n,d as m}from"./iframe-iYTVubkb.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BQmv4gxA.js";import{A as o}from"./ActionMenu-DsrGZTTt.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Bug3yX5i.js";import"./Modal.context-0kHKZyTP.js";import"./useControllableState-B7MdJ9VK.js";import"./Portal-UIwkRJiI.js";import"./useClientLayoutEffect-D2kexCYt.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-B8-QqpES.js";import"./Floating-D99qlo54.js";import"./useDescendant-CUf_Prmw.js";import"./DismissableLayer-B6vF3936.js";import"./ChevronRight-DIKddze6.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
