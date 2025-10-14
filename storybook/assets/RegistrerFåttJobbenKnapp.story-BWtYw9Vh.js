import{r as c,j as n,e as m}from"./iframe-pQ4IQbGd.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DQWXTWur.js";import{A as o}from"./ActionMenu-DqT_kNGK.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-Cgn_yqR3.js";import"./useControllableState-CnnhnPcF.js";import"./Portal-CQosx2dy.js";import"./useDescendant-CMYAhBZ6.js";import"./useClientLayoutEffect-iBlswlz7.js";import"./DismissableLayer-Df30yIAZ.js";import"./Floating-BgVINauq.js";import"./ChevronRight-BOOhZb3-.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
