import{r as c,j as n,e as m}from"./iframe-D9mqkd8J.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BZs2ebU6.js";import{A as o}from"./ActionMenu-BbE20DmC.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-BivSpKRk.js";import"./useControllableState-GZ88C6KH.js";import"./Portal-BTOg881_.js";import"./useDescendant-Dxtsczz9.js";import"./useClientLayoutEffect-B5nY-R9n.js";import"./DismissableLayer-BVSVExp-.js";import"./Floating-Cl9rhv31.js";import"./ChevronRight-Do3SUYmv.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
