import{r as c,j as n,d as m}from"./iframe-C9qr6ajT.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CekISBUW.js";import{A as o}from"./ActionMenu-CeDV4k95.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-C1lbU887.js";import"./Modal.context-DGkPTSJ2.js";import"./useControllableState-ysvxf6Tl.js";import"./Portal-C5vzwLvt.js";import"./useClientLayoutEffect-DTYWJsJ9.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-COtXxh9x.js";import"./Floating-dkFdS6af.js";import"./useDescendant-sYfellte.js";import"./DismissableLayer-szL1Inc1.js";import"./ChevronRight-1i8QBOZ4.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,b as default};
