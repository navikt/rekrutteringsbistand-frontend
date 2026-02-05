import{r as c,j as n,d as m}from"./iframe-MRLikfE6.js";import{R as a}from"./RegistrerFåttJobbenKnapp-B5amRzn7.js";import{A as o}from"./ActionMenu-Bk_XcOF3.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-CmPXcW09.js";import"./Modal.context-Qf00d-Ga.js";import"./useControllableState-CXTqdpiU.js";import"./Portal-Bszg4AYE.js";import"./useClientLayoutEffect-Cls70-9d.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-mICkb1JM.js";import"./Floating-jD8st6UI.js";import"./useDescendant-xNAAGTNI.js";import"./DismissableLayer-BZ4kC1EZ.js";import"./ChevronRight-a1WpzXIc.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
