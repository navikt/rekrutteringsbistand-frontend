import{r as c,j as n,e as m}from"./iframe-B9qi-KGR.js";import{R as a}from"./RegistrerFåttJobbenKnapp-B-MfysK7.js";import{A as o}from"./ActionMenu-DbDqoTSM.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-B6t6lyUq.js";import"./useControllableState-Bzw8feKc.js";import"./Portal-BzAj7gyv.js";import"./useDescendant-CA4fFxGA.js";import"./useClientLayoutEffect-CeG6ANYV.js";import"./DismissableLayer-Dc7F9n5V.js";import"./Floating-BEcHfbYm.js";import"./ChevronRight-Bc__H4nP.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
