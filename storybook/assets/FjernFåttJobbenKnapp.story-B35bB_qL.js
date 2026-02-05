import{r as l,j as n,d as c}from"./iframe-MRLikfE6.js";import{F as i}from"./FjernFåttJobbenKnapp-DtDRwrUo.js";import{A as o}from"./ActionMenu-Bk_XcOF3.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Qf00d-Ga.js";import"./useControllableState-CXTqdpiU.js";import"./Portal-Bszg4AYE.js";import"./useClientLayoutEffect-Cls70-9d.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-mICkb1JM.js";import"./Floating-jD8st6UI.js";import"./useDescendant-xNAAGTNI.js";import"./DismissableLayer-BZ4kC1EZ.js";import"./ChevronRight-a1WpzXIc.js";const S={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[p,d]=l.useState(!1);return n.jsxs(o,{open:p,onOpenChange:d,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
