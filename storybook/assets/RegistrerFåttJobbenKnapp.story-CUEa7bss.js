import{r as c,j as n,d as m}from"./iframe-DQ9jaFGK.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BSUuhxNq.js";import{A as o}from"./ActionMenu-DF6oXLuI.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-B9jifhTW.js";import"./useControllableState-BweIuYLw.js";import"./Portal-yI0zIr1p.js";import"./useClientLayoutEffect-DlE4khJJ.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-BRu3YlNO.js";import"./useDescendant-CBzkeEGZ.js";import"./DismissableLayer-CEPiaV-H.js";import"./Floating-DJT_DgxX.js";import"./ChevronRight-RtLW1mCX.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
