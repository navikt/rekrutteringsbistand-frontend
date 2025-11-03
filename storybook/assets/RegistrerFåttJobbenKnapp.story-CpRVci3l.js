import{r as c,j as n,d}from"./iframe-CQ6vvEeK.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CqCriW-o.js";import{A as o}from"./ActionMenu-BjTnXG01.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BLjCIKII.js";import"./useControllableState-B4ZbH_WK.js";import"./Portal-CBnPcAZ4.js";import"./useDescendant-AZdzncnu.js";import"./useClientLayoutEffect-DY3UtHGC.js";import"./DismissableLayer-iXkqC0Wv.js";import"./Floating-b5-qsFTJ.js";import"./ChevronRight-B5MYPCXi.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
