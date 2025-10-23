import{r as c,j as n,o as m}from"./iframe-BUTH-F7i.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DXKIta9N.js";import{A as o}from"./ActionMenu-D4vW3nML.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Blu6qJf4.js";import"./useControllableState-O207w7G8.js";import"./Portal-BHKSzDqj.js";import"./useDescendant-FlOlaWpg.js";import"./useClientLayoutEffect-Cq-0td_f.js";import"./DismissableLayer-DjbLVHS8.js";import"./Floating-CmTSltbU.js";import"./ChevronRight-MARd6bHq.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
