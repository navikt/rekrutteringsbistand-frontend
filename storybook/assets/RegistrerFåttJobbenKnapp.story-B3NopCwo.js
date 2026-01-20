import{r as c,j as n,d as m}from"./iframe-C0RnufXY.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CTu8lcun.js";import{A as o}from"./ActionMenu-Cn0yMx-j.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-a1WXVO8W.js";import"./Modal.context-wSuQQ2Dw.js";import"./useControllableState-lgVaH3ap.js";import"./Portal-MeogIUJJ.js";import"./useClientLayoutEffect-C6JTGAWP.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-DqwR6BTd.js";import"./Floating-D6hXdyd7.js";import"./useDescendant-DYtEJ0pI.js";import"./DismissableLayer-CJroQpy8.js";import"./ChevronRight---XS1I21.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,b as default};
