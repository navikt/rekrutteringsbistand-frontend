import{r as c,j as n,o as m}from"./iframe-DZyrTSlI.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C3SiZM9f.js";import{A as o}from"./ActionMenu-DsEdSMLC.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DtBDKmOm.js";import"./useControllableState-D5wZx8MS.js";import"./Portal-DuMv07kh.js";import"./useDescendant-VAvGN301.js";import"./useClientLayoutEffect-BxODUUc8.js";import"./DismissableLayer-BvD7YC6p.js";import"./Floating-iKvmiMa5.js";import"./ChevronRight-DS-IoR8D.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
