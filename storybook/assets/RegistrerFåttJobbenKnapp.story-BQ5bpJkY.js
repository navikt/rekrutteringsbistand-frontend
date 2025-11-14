import{r as c,j as n,d}from"./iframe-B4tn9iAN.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CpUaAVl6.js";import{A as o}from"./ActionMenu-B9p5Zxyl.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-B90kyfFI.js";import"./useControllableState-D36QMu8J.js";import"./Portal-Dh55U1eE.js";import"./useDescendant-BJvN3fUf.js";import"./useClientLayoutEffect-BIyNbf0Y.js";import"./DismissableLayer-YTWsz1Ro.js";import"./Floating-D6Hld4O_.js";import"./ChevronRight-VYJboyld.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
