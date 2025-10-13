import{r as c,j as n,e as m}from"./iframe-Dbv-ZY6m.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BXdqkAda.js";import{A as o}from"./ActionMenu-CwRhDOZi.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatTyper-CkRsvxsW.js";import"./Modal.context-AsKyuXOL.js";import"./useControllableState-CuovWR7y.js";import"./Portal-C0MhYn7a.js";import"./useDescendant-DSn6aWUY.js";import"./useClientLayoutEffect-BOrB_Ep7.js";import"./DismissableLayer-DmuPEZeO.js";import"./Floating-Df_h3IhB.js";import"./ChevronRight-Chg6WoTJ.js";const O={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,O as default};
