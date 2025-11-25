import{r as c,j as n,d as m}from"./iframe-Cb_tEQhr.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C8woFFl5.js";import{A as o}from"./ActionMenu-0HEu-XJ_.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CaVH4yK8.js";import"./useControllableState-sczq1XDD.js";import"./Portal-D0A8IGS7.js";import"./useClientLayoutEffect-DGMrKY-N.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-CLkAHq4F.js";import"./useDescendant-CMQxtiNt.js";import"./DismissableLayer-DZ0-rpcq.js";import"./Floating-Cgs5zX-q.js";import"./ChevronRight-DxjImgj4.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
