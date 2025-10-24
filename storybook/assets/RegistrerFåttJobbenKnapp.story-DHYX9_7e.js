import{r as c,j as n,o as m}from"./iframe-D5GLcELV.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DVD0c6ZS.js";import{A as o}from"./ActionMenu-DxIDI-g4.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-4Pv1BvK5.js";import"./useControllableState-C6IT1995.js";import"./Portal-DagI-hhJ.js";import"./useDescendant-4xTvoj0i.js";import"./useClientLayoutEffect-DGZN2Qdt.js";import"./DismissableLayer-B9ql3sCc.js";import"./Floating-n1bkuQHG.js";import"./ChevronRight-Dw7Srqqy.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
