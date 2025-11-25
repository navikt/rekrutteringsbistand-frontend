import{r as c,j as n,d as m}from"./iframe-BQ1incyN.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DS29i0x1.js";import{A as o}from"./ActionMenu-9kP9ris4.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BQ3LJgn_.js";import"./useControllableState-BQTyOv-Y.js";import"./Portal-DPf-KDVH.js";import"./useClientLayoutEffect-BWyBD_to.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-DNBUtRbr.js";import"./useDescendant-Ctj0Kd4c.js";import"./DismissableLayer-CujSqPxa.js";import"./Floating-B77ht9HN.js";import"./ChevronRight-CyRhvWcJ.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
