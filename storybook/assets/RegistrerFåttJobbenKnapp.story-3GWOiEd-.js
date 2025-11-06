import{r as c,j as n,d}from"./iframe-DxFO8IvB.js";import{R as a}from"./RegistrerFåttJobbenKnapp-83pvYB1a.js";import{A as o}from"./ActionMenu-CN4qh3ST.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-zx_c4c0w.js";import"./useControllableState-CPx_uKRc.js";import"./Portal-1nYmzj9s.js";import"./useDescendant-C-lIABgv.js";import"./useClientLayoutEffect-BkjQOB3H.js";import"./DismissableLayer-CggqpmuT.js";import"./Floating-CETi6cKv.js";import"./ChevronRight-I-S2si1o.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
