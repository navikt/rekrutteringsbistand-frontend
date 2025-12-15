import{r as c,j as n,d as m}from"./iframe-Dp6nHdOg.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BNbfWER1.js";import{A as o}from"./ActionMenu-BL45Y7dj.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-n3x3Fqud.js";import"./useControllableState-Cfuho32D.js";import"./Portal-D3vJuV3P.js";import"./useClientLayoutEffect-O96VxCt4.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-8ydpUS_x.js";import"./useDescendant-CihCDKtv.js";import"./DismissableLayer-Dt4vpDcl.js";import"./Floating-Z8anwbmH.js";import"./ChevronRight-CxdLNC6W.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
