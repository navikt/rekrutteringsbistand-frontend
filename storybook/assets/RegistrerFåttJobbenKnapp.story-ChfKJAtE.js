import{r as c,j as n,d as m}from"./iframe-D9qA_9GD.js";import{R as a}from"./RegistrerFåttJobbenKnapp-ubailf_z.js";import{A as o}from"./ActionMenu-D2Gim38k.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-DTm4fwY2.js";import"./Modal.context-B_18zVZi.js";import"./useControllableState-BQN1ohGC.js";import"./Portal-Cs6w2Skg.js";import"./useClientLayoutEffect-GzQGtyHt.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-Bh2wHF7G.js";import"./Floating-B0mqIbvs.js";import"./useDescendant-DKxVsKrU.js";import"./DismissableLayer-C12o3Eot.js";import"./ChevronRight-BvECYT37.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
