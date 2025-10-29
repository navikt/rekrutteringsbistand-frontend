import{r as c,j as n,d}from"./iframe-CnM7RT4h.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CG28aieN.js";import{A as o}from"./ActionMenu-B-jgfd6u.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-vVkaDHEy.js";import"./useControllableState-Cn-1utpz.js";import"./Portal-HtHARWFn.js";import"./useDescendant-CRShSGYi.js";import"./useClientLayoutEffect-CgR7ggQ6.js";import"./DismissableLayer-BfJi0g9l.js";import"./Floating-BE35QyMY.js";import"./ChevronRight-B1FVo_uA.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
