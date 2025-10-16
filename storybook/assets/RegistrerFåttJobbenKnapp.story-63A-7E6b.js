import{r as c,j as n,e as m}from"./iframe-CcX8-4GA.js";import{R as a}from"./RegistrerFåttJobbenKnapp-03Om59zD.js";import{A as o}from"./ActionMenu-D26dYIs0.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-CQY3-GGu.js";import"./useControllableState-CC5b_oP9.js";import"./Portal-b-kcbRk6.js";import"./useDescendant-B5pFWjou.js";import"./useClientLayoutEffect-6_RpH1W8.js";import"./DismissableLayer-DGfODv6M.js";import"./Floating-BIWMUylC.js";import"./ChevronRight-BoCs2O8n.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
