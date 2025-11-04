import{r as c,j as n,d}from"./iframe-DSdiPFC4.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DUfB-5nJ.js";import{A as o}from"./ActionMenu-3fwY5VBN.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-qHNJI2Qp.js";import"./useControllableState-CrxLrzqj.js";import"./Portal-Cjh34YZx.js";import"./useDescendant-CnVxbVRh.js";import"./useClientLayoutEffect-kMRoI8rq.js";import"./DismissableLayer-CxvVRpgD.js";import"./Floating-C0L3SinS.js";import"./ChevronRight--bXIQmbK.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
