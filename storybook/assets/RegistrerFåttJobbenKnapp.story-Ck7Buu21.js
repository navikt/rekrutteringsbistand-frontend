import{r as c,j as n,d}from"./iframe-cNvDYj7l.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BV8kE6b9.js";import{A as o}from"./ActionMenu-BesGlere.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-C7s7PBJK.js";import"./useControllableState-Daldu6V6.js";import"./Portal-D16QqQVS.js";import"./useDescendant-0IKEmXuu.js";import"./useClientLayoutEffect-CsayHDtQ.js";import"./DismissableLayer-BGf_Rf18.js";import"./Floating-BH6rc7aD.js";import"./ChevronRight-DX3DNo0e.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
