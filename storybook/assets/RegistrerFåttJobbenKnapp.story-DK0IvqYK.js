import{r as c,j as n,d as m}from"./iframe-Dy0lgISD.js";import{R as a}from"./RegistrerFåttJobbenKnapp-B4-eOg_G.js";import{A as o}from"./ActionMenu-BxVQhgzZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BzlekgQp.js";import"./useControllableState-DsPI5clQ.js";import"./Portal-BxO1BEfI.js";import"./useClientLayoutEffect-BppbtjEv.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-kNqACp-i.js";import"./useDescendant-gtpiM4GY.js";import"./DismissableLayer-CwiY48hJ.js";import"./Floating-JkM8H2jw.js";import"./ChevronRight-DN-K0u38.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
