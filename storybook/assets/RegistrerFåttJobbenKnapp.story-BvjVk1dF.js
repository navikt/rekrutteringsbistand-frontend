import{r as c,j as n,e as m}from"./iframe-BBDbIFjR.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C0CN5fxW.js";import{A as o}from"./ActionMenu-kxLo-bZP.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-74hVkHzZ.js";import"./useControllableState-BWhluZK-.js";import"./Portal-Cd-Vlf5s.js";import"./useDescendant-bNYqRo_D.js";import"./useClientLayoutEffect-VWKh4fsS.js";import"./DismissableLayer-CHweKlIR.js";import"./Floating-DFxJJPog.js";import"./ChevronRight-B7wrvTwB.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
