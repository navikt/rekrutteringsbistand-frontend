import{r as c,j as n,d as m}from"./iframe-yXg8aEsL.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BXQgWg-H.js";import{A as o}from"./ActionMenu-DTdLXnYr.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BCDGvJ6o.js";import"./useControllableState-DktbU-4S.js";import"./Portal-D0nb71Pi.js";import"./useClientLayoutEffect-BajYG73Z.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-DnPfkqAp.js";import"./useDescendant-Dx-uD8OD.js";import"./DismissableLayer-DuEJM6Bc.js";import"./Floating-CqLzZQa9.js";import"./ChevronRight-mCbV9QOe.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
