import{r as c,j as n,d as m}from"./iframe-Djf0aaCu.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BJ8jq_LR.js";import{A as o}from"./ActionMenu-DlZGlcQx.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Ak7lim11.js";import"./useControllableState-DRurQPnd.js";import"./Portal-DZBkUJ0T.js";import"./useClientLayoutEffect-CRL3UlMw.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-Bf9MrB6D.js";import"./useDescendant-bZqUUkQD.js";import"./DismissableLayer-5bSw7yqi.js";import"./Floating-CT978M8b.js";import"./ChevronRight-DyQc02Ru.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,U as default};
