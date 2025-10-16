import{r as c,j as n,e as m}from"./iframe-BjHUBmX4.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Z9fnEEP0.js";import{A as o}from"./ActionMenu-Cj6LiKLf.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-BPs9_y3Y.js";import"./useControllableState-Co_ihWoO.js";import"./Portal-GnIiBHrC.js";import"./useDescendant-CZdqCo1y.js";import"./useClientLayoutEffect-C1IG9L-k.js";import"./DismissableLayer-UMsxYec2.js";import"./Floating-D8oa9Esk.js";import"./ChevronRight-4GeIVaw2.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
