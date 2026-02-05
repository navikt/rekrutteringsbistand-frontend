import{r as c,j as n,d as m}from"./iframe-BQn8oluG.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DtWIG0mc.js";import{A as o}from"./ActionMenu-DFZhoxbD.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-COWiAB6Z.js";import"./Modal.context-DNTgIFxy.js";import"./useControllableState-CCj747yy.js";import"./Portal-CW5ZBVtE.js";import"./useClientLayoutEffect-BACD_49t.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-Kuu0acC8.js";import"./Floating-BB73xC18.js";import"./useDescendant-CqCnzhwB.js";import"./DismissableLayer-BdYCKIFL.js";import"./ChevronRight-BA9bqRNx.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
