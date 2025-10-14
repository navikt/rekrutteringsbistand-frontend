import{r as c,j as n,e as m}from"./iframe-DUIlOHDN.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BiPTunoZ.js";import{A as o}from"./ActionMenu-CtBmVVGo.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatTyper-CkRsvxsW.js";import"./Modal.context-Cu402-Eo.js";import"./useControllableState-PeOYsQib.js";import"./Portal-C-oWFBZH.js";import"./useDescendant-Cqjw-0eu.js";import"./useClientLayoutEffect-Bhjp9e8S.js";import"./DismissableLayer-DsBtdNSu.js";import"./ChevronRight-CEej6OBo.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
