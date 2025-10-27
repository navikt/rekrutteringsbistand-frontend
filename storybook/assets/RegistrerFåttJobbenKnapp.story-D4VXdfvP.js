import{r as c,j as n,o as m}from"./iframe-BI-wOhDW.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CiZk_9tD.js";import{A as o}from"./ActionMenu-AlP6N95S.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BomWj9n6.js";import"./useControllableState-Buz9rD4N.js";import"./Portal-BJVU-f0N.js";import"./useDescendant-vN9lMEgX.js";import"./useClientLayoutEffect-DuSL_6x7.js";import"./DismissableLayer-D2T5B0pj.js";import"./Floating-ZhAJ63iw.js";import"./ChevronRight-5QxKcjfR.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
