import{r as c,j as n,o as m}from"./iframe-CvAsB_PP.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DHXC3Wuk.js";import{A as o}from"./ActionMenu-o3krbH-h.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Btg_hFAx.js";import"./useControllableState-CXrdSXg2.js";import"./Portal-BFUrlxOA.js";import"./useDescendant-D3xT3_3v.js";import"./useClientLayoutEffect-DViUq2IM.js";import"./DismissableLayer-CUhhFJsj.js";import"./Floating-fWiVt9O6.js";import"./ChevronRight-J4RTndj9.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
