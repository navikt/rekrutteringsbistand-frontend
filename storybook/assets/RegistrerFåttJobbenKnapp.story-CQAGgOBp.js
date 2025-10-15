import{r as c,j as n,e as m}from"./iframe-D0GwblT9.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DWRI4ri-.js";import{A as o}from"./ActionMenu-CmMyC481.js";import"./preload-helper-DoVtK-SO.js";import"./Modal.context-DI9DxRcm.js";import"./useControllableState-bKZctjKQ.js";import"./Portal-VYoAVI_M.js";import"./useDescendant-C6ZI4kS1.js";import"./useClientLayoutEffect-B_75iQJq.js";import"./DismissableLayer-CmDka2Tt.js";import"./Floating-CkWYrhuc.js";import"./ChevronRight-DH7YTAzA.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
