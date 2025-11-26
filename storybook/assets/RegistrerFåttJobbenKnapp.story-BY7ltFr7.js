import{r as c,j as n,d as m}from"./iframe-BA8lGxgc.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C8rGOguF.js";import{A as o}from"./ActionMenu-BDwx9Un8.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-B3p26qHn.js";import"./useControllableState-sTcONFh0.js";import"./Portal-C86qxS3C.js";import"./useClientLayoutEffect-CGYyINhG.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-0RizkFOC.js";import"./useDescendant-DkIsMul7.js";import"./DismissableLayer-Cs8olJS3.js";import"./Floating-BhRFj5Ef.js";import"./ChevronRight-BEEe5jeR.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
