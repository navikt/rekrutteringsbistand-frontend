import{r as c,j as n,d as m}from"./iframe-Jss5f2B_.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Dc1Pq_es.js";import{A as o}from"./ActionMenu-D7lnvu5p.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-55emPdz_.js";import"./useControllableState-CZKHLiQ0.js";import"./Portal-C-88-3-M.js";import"./useClientLayoutEffect-Bxl3NU5W.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-D6C22Yzy.js";import"./useDescendant-BN6N_S6e.js";import"./DismissableLayer-BExMC79b.js";import"./Floating-B9mav9r0.js";import"./ChevronRight-YK-CMcP2.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
