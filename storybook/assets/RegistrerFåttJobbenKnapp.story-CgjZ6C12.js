import{r as c,j as n,e as m}from"./iframe-BELOvKNN.js";import{R as a}from"./RegistrerFåttJobbenKnapp-hYk0tDIR.js";import{A as o}from"./ActionMenu-DKH_YEtD.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatTyper-CkRsvxsW.js";import"./Modal.context-DWOAM3YB.js";import"./useControllableState-CZJeXb2k.js";import"./Portal-C4Fh4h_T.js";import"./useDescendant-7y0uEY9z.js";import"./useClientLayoutEffect-CmE_1-f7.js";import"./DismissableLayer-BxOt-ZBD.js";import"./Floating-3-NXBcG9.js";import"./ChevronRight-BTAIsPRC.js";const O={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,O as default};
