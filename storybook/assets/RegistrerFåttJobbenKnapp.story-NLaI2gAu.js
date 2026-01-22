import{r as c,j as n,d as m}from"./iframe-_Y_FQOIK.js";import{R as a}from"./RegistrerFåttJobbenKnapp-5Na00L6m.js";import{A as o}from"./ActionMenu-C_S7LI2Z.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Dqxd3fFB.js";import"./Modal.context-C_2IzOEE.js";import"./useControllableState-D-6TawYQ.js";import"./Portal-BF_1Jgmg.js";import"./useClientLayoutEffect-tdwdHZzr.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-e9kOIaux.js";import"./Floating-BkIEDuGO.js";import"./useDescendant-D7tLhiI3.js";import"./DismissableLayer-B1s_qZ9h.js";import"./ChevronRight-CHuqZhhP.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
