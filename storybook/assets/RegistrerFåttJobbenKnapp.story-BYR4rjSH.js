import{r as c,j as n,e as m}from"./iframe-B7Dvl8Jj.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C0Wm90B7.js";import{A as o}from"./ActionMenu-DviZVRKu.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-BGzr1iqs.js";import"./useControllableState-BCdW65Bd.js";import"./Portal-KlBHLL9U.js";import"./useDescendant-DxRANxao.js";import"./useClientLayoutEffect-C8pNxaDh.js";import"./DismissableLayer-BbVuMLHg.js";import"./Floating-CzvhA-rz.js";import"./ChevronRight-Df75AaoW.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
