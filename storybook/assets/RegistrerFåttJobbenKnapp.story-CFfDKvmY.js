import{r as c,j as n,o as m}from"./iframe-Dz5WkgO0.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BZToLMGV.js";import{A as o}from"./ActionMenu-_mkAJ48A.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DYi7aOes.js";import"./useControllableState-XDgiReJF.js";import"./Portal-CTL3ZyLh.js";import"./useDescendant-F22c6Vqt.js";import"./useClientLayoutEffect-DCXCSFQx.js";import"./DismissableLayer-aFCZqziv.js";import"./Floating-dqP1CGpv.js";import"./ChevronRight-Di0EMH8c.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
