import{r as c,j as n,d}from"./iframe-BvvhrRbe.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CfLkLZAN.js";import{A as o}from"./ActionMenu-DcF8HEzL.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BcwzVHgg.js";import"./useControllableState-B5f92340.js";import"./Portal-C4Zfnjpp.js";import"./useDescendant-y-KejPye.js";import"./useClientLayoutEffect-KrIuP9uz.js";import"./DismissableLayer-DHzi24Js.js";import"./Floating-BVdV2l6X.js";import"./ChevronRight-BP12pIbF.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
