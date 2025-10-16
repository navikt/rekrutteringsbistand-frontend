import{r as c,j as n,e as m}from"./iframe-CYGmpbFx.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C6uei2j9.js";import{A as o}from"./ActionMenu-DDy-fhqp.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-BnLUGpTN.js";import"./useControllableState-D3hxcXud.js";import"./Portal-G0mLWwGC.js";import"./useDescendant-DpPZBL4W.js";import"./useClientLayoutEffect-BsOlTr7j.js";import"./DismissableLayer-HqJggTnx.js";import"./Floating-CtB32558.js";import"./ChevronRight-eNsLcMvC.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
