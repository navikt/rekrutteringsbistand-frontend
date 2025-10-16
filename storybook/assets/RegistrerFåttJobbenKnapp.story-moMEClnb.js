import{r as c,j as n,e as m}from"./iframe-G1hfx8xa.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Dl3xPgOO.js";import{A as o}from"./ActionMenu-CS-fIBa0.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-Caws_Tsd.js";import"./useControllableState-BWTLl1yr.js";import"./Portal-ByGiSyJ-.js";import"./useDescendant-DJFzw8Nt.js";import"./useClientLayoutEffect-CEzvnbdf.js";import"./DismissableLayer-DImObKoJ.js";import"./Floating-CJPAhfzD.js";import"./ChevronRight-Dt8IxSY6.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
