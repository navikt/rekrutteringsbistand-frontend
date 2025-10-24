import{r as c,j as n,o as m}from"./iframe-DsITc3mA.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DCk6OD5m.js";import{A as o}from"./ActionMenu-BY86g4ug.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CTOTWPev.js";import"./useControllableState-DLUEVyO-.js";import"./Portal-C5xt79du.js";import"./useDescendant-PvMXGtrB.js";import"./useClientLayoutEffect-DY3v19G_.js";import"./DismissableLayer-COL-0CdF.js";import"./Floating-B5EXpEC5.js";import"./ChevronRight-B8WasCXU.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
