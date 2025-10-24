import{r as c,j as n,o as m}from"./iframe-DyjxJt6_.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DkINyHuh.js";import{A as o}from"./ActionMenu-DhmDldcv.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DsW8rZaM.js";import"./useControllableState-DyBNm6ng.js";import"./Portal-BdmLsT-1.js";import"./useDescendant-CYkwdAdJ.js";import"./useClientLayoutEffect-vNIzxBoF.js";import"./DismissableLayer-9F188wWR.js";import"./Floating-yW43KoRr.js";import"./ChevronRight-DgfL1Hcm.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
