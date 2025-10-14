import{r as c,j as n,e as m}from"./iframe-DMAO4dCV.js";import{R as a}from"./RegistrerFåttJobbenKnapp-IawH9ooV.js";import{A as o}from"./ActionMenu-DrqPd4jX.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-B7_Jj5qA.js";import"./useControllableState-Cbu2ku7v.js";import"./Portal-ydlvizgj.js";import"./useDescendant-BDVhQCzW.js";import"./useClientLayoutEffect-Ct9g2HZI.js";import"./DismissableLayer-zlUEuIs5.js";import"./Floating-D7VagRJj.js";import"./ChevronRight-B4r8jmSj.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
