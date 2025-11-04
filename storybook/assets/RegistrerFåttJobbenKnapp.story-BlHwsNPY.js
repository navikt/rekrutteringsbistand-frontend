import{r as c,j as n,d}from"./iframe-Db4gm7sv.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BeyD2AvY.js";import{A as o}from"./ActionMenu-B2g4WVo4.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-_lDx5AbH.js";import"./useControllableState-BzElCyNZ.js";import"./Portal-BwjZ2tSD.js";import"./useDescendant-Ba2aSA-P.js";import"./useClientLayoutEffect-DD-jHHhO.js";import"./DismissableLayer-CesHQX8D.js";import"./Floating-BhUk3bxl.js";import"./ChevronRight-vBY-whxn.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
