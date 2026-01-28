import{r as l,j as n,d as c}from"./iframe-CeBddf6m.js";import{F as i}from"./FjernFåttJobbenKnapp-DQ1ycgrD.js";import{A as o}from"./ActionMenu-CcfBY--f.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DHabSalL.js";import"./useControllableState-Z5xfEuBZ.js";import"./Portal-xuNywQp0.js";import"./useClientLayoutEffect-LE5s5o8b.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BfGve3Gx.js";import"./Floating-zp7EWh3L.js";import"./useDescendant-B8uZGA4T.js";import"./DismissableLayer-BVglxUyP.js";import"./ChevronRight-BS1GcyjH.js";const S={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[p,d]=l.useState(!1);return n.jsxs(o,{open:p,onOpenChange:d,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false,
    actionMenu: true
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <FjernFåttJobbenKnapp {...args} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...a.parameters?.docs?.source}}};export{a as IMenu,e as Knapp,r as Laster,S as default};
