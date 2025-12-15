import{r as c,j as n,d as m}from"./iframe-BaixhwPd.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BP4YVxUs.js";import{A as o}from"./ActionMenu-C053KI-I.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DXSg-077.js";import"./useControllableState-DEuiE3NL.js";import"./Portal-BcBABZ9V.js";import"./useClientLayoutEffect-D3dVonUg.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-DCWijGfn.js";import"./useDescendant-DQ13ledV.js";import"./DismissableLayer-DXapyLoM.js";import"./Floating-Dm7sVZxI.js";import"./ChevronRight-Bx_LiFjR.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
