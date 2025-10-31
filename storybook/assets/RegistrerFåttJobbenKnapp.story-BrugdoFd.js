import{r as c,j as n,d}from"./iframe-BieBZBrC.js";import{R as a}from"./RegistrerFåttJobbenKnapp-TTIBqGIe.js";import{A as o}from"./ActionMenu-DTjFBcMo.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BqRc_p1X.js";import"./useControllableState-DtKQdZJ4.js";import"./Portal-QvoiE7cM.js";import"./useDescendant-CBlcYzGO.js";import"./useClientLayoutEffect-B-LF-TZu.js";import"./DismissableLayer-BYCpcB0r.js";import"./Floating-D1B6S8x4.js";import"./ChevronRight-BI4Fdz4-.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
