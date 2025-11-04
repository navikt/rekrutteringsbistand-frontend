import{r as c,j as n,d}from"./iframe-CeRr706s.js";import{R as a}from"./RegistrerFåttJobbenKnapp-_Q8oaArU.js";import{A as o}from"./ActionMenu-kBjPqPUQ.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CbsAixuf.js";import"./useControllableState-7aLFU1jC.js";import"./Portal-BtjL7sfS.js";import"./useDescendant-DZUSmoVV.js";import"./useClientLayoutEffect-VV1lGVs7.js";import"./DismissableLayer-DntprCGM.js";import"./Floating-1mHHbGY3.js";import"./ChevronRight-BZ6vb5ST.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
