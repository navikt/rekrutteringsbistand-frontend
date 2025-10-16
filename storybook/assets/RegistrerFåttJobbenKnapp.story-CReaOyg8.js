import{r as c,j as n,e as m}from"./iframe-BHAALu18.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BkReZRxW.js";import{A as o}from"./ActionMenu-CXTr0MRG.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-CPyqR72d.js";import"./useControllableState-DvMFbOQQ.js";import"./Portal-9BsBigvd.js";import"./useDescendant-DXO6KeRV.js";import"./useClientLayoutEffect-DEuAlZZ5.js";import"./DismissableLayer-be7a08mI.js";import"./Floating-DjyHzdN5.js";import"./ChevronRight-CdoewiD4.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
