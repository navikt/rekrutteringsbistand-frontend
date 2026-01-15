import{r as c,j as n,d as m}from"./iframe-D9efq7gm.js";import{R as a}from"./RegistrerFåttJobbenKnapp-QL645b7a.js";import{A as o}from"./ActionMenu-BbWu17Fs.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-CXEg2R-5.js";import"./Modal.context-BS_OZFTE.js";import"./useControllableState-CeE_Zg6y.js";import"./Portal-DRlXkuLu.js";import"./useClientLayoutEffect-dTbrXiSO.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-IhTPTW7u.js";import"./useDescendant-Co3zNkM5.js";import"./DismissableLayer-wq39k6jE.js";import"./Floating-CjBNcG0G.js";import"./ChevronRight-DkHShnmi.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
