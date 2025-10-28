import{r as c,j as n,d}from"./iframe-Dc4kNGne.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DqJnWMgP.js";import{A as o}from"./ActionMenu-Z9efkhej.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-D4sW2lKa.js";import"./useControllableState-idObFdbI.js";import"./Portal-Bce5BjZH.js";import"./useDescendant-CMJ867Hz.js";import"./useClientLayoutEffect-CxfS0aD3.js";import"./DismissableLayer-Bvg8CO6L.js";import"./Floating-7QApcGEt.js";import"./ChevronRight-e3i8gGA4.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
