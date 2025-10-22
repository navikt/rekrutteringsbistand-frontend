import{r as c,j as n,o as m}from"./iframe-29wJf-MM.js";import{R as a}from"./RegistrerFåttJobbenKnapp-_xh2VPYf.js";import{A as o}from"./ActionMenu-C6s4PB-U.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Dcp_CmN3.js";import"./useControllableState-CdW7uF-V.js";import"./Portal-D7kWJn2E.js";import"./useDescendant-Df0cd9Zl.js";import"./useClientLayoutEffect-BlmE3wW5.js";import"./DismissableLayer-Drl13rnU.js";import"./Floating-BvecaDw2.js";import"./ChevronRight-DlzQdbX3.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
