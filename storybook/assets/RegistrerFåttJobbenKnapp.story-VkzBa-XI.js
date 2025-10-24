import{r as c,j as n,o as m}from"./iframe-DjWAYC3X.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BxItU8An.js";import{A as o}from"./ActionMenu-Bf8ZwH8y.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-C1cH-4SS.js";import"./useControllableState-B_dAdZ-G.js";import"./Portal-CSnYFtNM.js";import"./useDescendant-DApziTPC.js";import"./useClientLayoutEffect-Bu2a2BR2.js";import"./DismissableLayer-DGq0BrI1.js";import"./Floating-DA6FkBNw.js";import"./ChevronRight-Q2zHiNqf.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
