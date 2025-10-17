import{r as c,j as n,e as m}from"./iframe-DLVjCQ2l.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CLyWwsKu.js";import{A as o}from"./ActionMenu-PbsPQzIf.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-DC7G_jSK.js";import"./useControllableState-B7-O95gB.js";import"./Portal-qVmeyk5u.js";import"./useDescendant-PZFhHTIi.js";import"./useClientLayoutEffect-DlfPVjcQ.js";import"./DismissableLayer-TqNl7B5c.js";import"./Floating-a8dg55PP.js";import"./ChevronRight-CIP8Hrnh.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
