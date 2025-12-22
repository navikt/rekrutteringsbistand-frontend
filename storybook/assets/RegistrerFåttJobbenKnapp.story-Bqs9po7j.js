import{r as c,j as n,d as m}from"./iframe-_QUoCLzD.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Co9TLBA0.js";import{A as o}from"./ActionMenu-MnQcPvY-.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BHSwgPbI.js";import"./useControllableState-wViw2aPt.js";import"./Portal-BkG3zDgu.js";import"./useClientLayoutEffect-Y6xfv06t.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-DpvLue1j.js";import"./useDescendant-BM9cR_29.js";import"./DismissableLayer-h4ATGLsG.js";import"./Floating-BzDqfX3-.js";import"./ChevronRight-PeUz0ZGh.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,U as default};
