import{r as c,j as n,d}from"./iframe-CiGY7qMR.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Df-tlu_m.js";import{A as o}from"./ActionMenu-D2WhoEv_.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-D2yQqxZ7.js";import"./useControllableState-BE8X9NLB.js";import"./Portal-B36_v9Q7.js";import"./useDescendant-X5nKPTUI.js";import"./useClientLayoutEffect-B5wV4Wz7.js";import"./DismissableLayer-BWiY_6h3.js";import"./Floating-CHAuviCz.js";import"./ChevronRight-D_rYTx2X.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
