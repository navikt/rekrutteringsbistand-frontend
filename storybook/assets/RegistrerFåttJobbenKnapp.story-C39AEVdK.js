import{r as c,j as n,d}from"./iframe-DenWKEC9.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BIdvV_TO.js";import{A as o}from"./ActionMenu-C-ZdGfO9.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Dz6HeStX.js";import"./useControllableState-DjghFc1P.js";import"./Portal-BdqQ_UWT.js";import"./useDescendant-B-WMW2Zy.js";import"./useClientLayoutEffect-DBad4hBW.js";import"./DismissableLayer-DZ5QmeOI.js";import"./Floating-Ben9ktU4.js";import"./ChevronRight-90f83Bjx.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
