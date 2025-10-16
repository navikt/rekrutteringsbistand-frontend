import{r as c,j as n,e as m}from"./iframe-DSaqXt6k.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DBbJBPYa.js";import{A as o}from"./ActionMenu-DTnE_FCo.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-DfRJF0pN.js";import"./useControllableState-DAjJj0hK.js";import"./Portal-DDTzhLqT.js";import"./useDescendant-CdSSQXFb.js";import"./useClientLayoutEffect-CiKxysUG.js";import"./DismissableLayer-BWw-tESd.js";import"./Floating-D56SMUEM.js";import"./ChevronRight-Ct4U80BP.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
