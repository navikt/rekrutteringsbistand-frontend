import{r as c,j as n,d as m}from"./iframe-CYkqDpFQ.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BR7_uSok.js";import{A as o}from"./ActionMenu-DrO2emjn.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-BJXCTp5N.js";import"./Modal.context-DUSEIPc7.js";import"./useControllableState-BXn8QYgD.js";import"./Portal-D2drl2B4.js";import"./useClientLayoutEffect-uErDUp0f.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-D5tJv1x2.js";import"./useDescendant-CcyedC1J.js";import"./DismissableLayer-BuyAlXxU.js";import"./Floating-MFWnOhje.js";import"./ChevronRight-DuooAMaP.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,b as default};
