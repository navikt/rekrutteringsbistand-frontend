import{r as c,j as n,d as m}from"./iframe-CxUg2AuX.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DyV-KjMA.js";import{A as o}from"./ActionMenu-ffOVv3eh.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BkSTZliK.js";import"./useControllableState-B9AVaVs-.js";import"./Portal-DHLo116K.js";import"./useClientLayoutEffect-CzIkdIPi.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-B4wDcEGI.js";import"./useDescendant-BgCd26Yg.js";import"./DismissableLayer-V6EjSsu2.js";import"./Floating-DoetCIZf.js";import"./ChevronRight-CAi-vI9_.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,U as default};
