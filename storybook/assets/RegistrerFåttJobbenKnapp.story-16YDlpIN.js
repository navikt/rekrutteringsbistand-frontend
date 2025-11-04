import{r as c,j as n,d}from"./iframe-ByNpXw81.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BA9803OA.js";import{A as o}from"./ActionMenu-C2tJHBBD.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-D5msxr56.js";import"./useControllableState-CF148P0b.js";import"./Portal-E7AaDyiu.js";import"./useDescendant-DqJITIpZ.js";import"./useClientLayoutEffect-CDmxK94Y.js";import"./DismissableLayer-BQOrSO4O.js";import"./Floating-D0PuAiXz.js";import"./ChevronRight-CnZV6X7D.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
