import{r as c,j as n,e as m}from"./iframe-DomB5bjj.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BMQpWHe3.js";import{A as o}from"./ActionMenu-DQbLhF4s.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-B4LbjCDK.js";import"./useControllableState-8E3oNcN9.js";import"./Portal-odgNyupx.js";import"./useDescendant-_yY1UdUb.js";import"./useClientLayoutEffect-BJo3p9TX.js";import"./DismissableLayer-D78qK4dT.js";import"./Floating-wIq2G91J.js";import"./ChevronRight-E35L1M83.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,C as default};
