import{r as c,j as n,o as m}from"./iframe-DhZ6odjH.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Dj2n6z2P.js";import{A as o}from"./ActionMenu-vRnjwh2L.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context--Sc1y3le.js";import"./useControllableState-XxOyj5-F.js";import"./Portal-B4A5WcvW.js";import"./useDescendant-BuZfSEYa.js";import"./useClientLayoutEffect-BEniKjNU.js";import"./DismissableLayer-C_voP-Bm.js";import"./Floating-pVApUBMN.js";import"./ChevronRight-ZWLZ7Pgd.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
