import{r as c,j as n,o as m}from"./iframe-D0f7J1nY.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BHw7FKBT.js";import{A as o}from"./ActionMenu-SWG6sTVa.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Byy9zaEN.js";import"./useControllableState-CqeC_HD5.js";import"./Portal-CpKF6t0Q.js";import"./useDescendant-Dgila3fS.js";import"./useClientLayoutEffect-BIx7NCwy.js";import"./DismissableLayer-weKq368f.js";import"./Floating-DMZ0EJf-.js";import"./ChevronRight-TzmmjE0e.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
