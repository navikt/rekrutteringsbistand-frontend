import{r as c,j as n,o as m}from"./iframe-Bmd04qoj.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BEfNWZ-t.js";import{A as o}from"./ActionMenu-BLPy9eyv.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-D7HeWnaH.js";import"./useControllableState-vvpRagwg.js";import"./Portal-Cw8T4M2j.js";import"./useDescendant-DCEOj9DG.js";import"./useClientLayoutEffect-Z7wWkAeT.js";import"./DismissableLayer-B3cVLoLu.js";import"./Floating-DiFsU2rn.js";import"./ChevronRight-B6YSpZY-.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
