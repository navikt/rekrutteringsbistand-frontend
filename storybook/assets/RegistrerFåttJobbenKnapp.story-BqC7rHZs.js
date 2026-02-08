import{r as c,j as n,d as m}from"./iframe-YHW4kXZv.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DtVeNpJ1.js";import{A as o}from"./ActionMenu-D2whky1H.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Ww8w9krR.js";import"./Modal.context-C4wiLZa4.js";import"./useControllableState-DBDJpPfm.js";import"./Portal-DuaLV0Vg.js";import"./useClientLayoutEffect-BQ4GNSxx.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-ugXEHbCx.js";import"./Floating-DPEaRSF2.js";import"./useDescendant-D5VXQPx1.js";import"./DismissableLayer-BjppdLKT.js";import"./ChevronRight-DYzbbEFv.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
