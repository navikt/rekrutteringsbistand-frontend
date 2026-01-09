import{r as c,j as n,d as m}from"./iframe-5rwrKWZV.js";import{R as a}from"./RegistrerFåttJobbenKnapp-rF-2qoAR.js";import{A as o}from"./ActionMenu-CE_ernkT.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-8SGbIxVb.js";import"./useControllableState-D-uW9VwC.js";import"./Portal-B_NIOloz.js";import"./useClientLayoutEffect-DOxN0QLi.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-IVNWCuoX.js";import"./useDescendant-DK_E4yia.js";import"./DismissableLayer-BDumuCnE.js";import"./Floating-CQQ7Xyyt.js";import"./ChevronRight-DmEPs3V6.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
