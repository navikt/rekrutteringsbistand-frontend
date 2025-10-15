import{r as c,j as n,e as m}from"./iframe-BQJxXW9d.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C-uR0goq.js";import{A as o}from"./ActionMenu-CaRXI4ZS.js";import"./preload-helper-DoVtK-SO.js";import"./Modal.context-DxEobc4s.js";import"./useControllableState-DLMKTCIV.js";import"./Portal-DNXh-AtB.js";import"./useDescendant-BazVU77l.js";import"./useClientLayoutEffect-MoxS65NT.js";import"./DismissableLayer-D0uVOeIp.js";import"./Floating-BlSc94v9.js";import"./ChevronRight-CRtyHgbr.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
