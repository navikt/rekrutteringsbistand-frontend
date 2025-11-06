import{r as c,j as n,d}from"./iframe-CEi1Y25_.js";import{R as a}from"./RegistrerFåttJobbenKnapp-tYet5yuI.js";import{A as o}from"./ActionMenu-CTwx9Atr.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-vOD-2fLT.js";import"./useControllableState-BYJP4Qy4.js";import"./Portal-Bw0saJbl.js";import"./useDescendant-Ct6WCee5.js";import"./useClientLayoutEffect-DF_7u9uO.js";import"./DismissableLayer-BtFa0zwB.js";import"./Floating-BK8URA97.js";import"./ChevronRight-Bj3UX8tS.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
