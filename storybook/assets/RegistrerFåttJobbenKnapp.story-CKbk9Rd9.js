import{r as c,j as n,e as m}from"./iframe-Ejs43Sks.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DE74-e4B.js";import{A as o}from"./ActionMenu-CZi8kKqA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatTyper-CkRsvxsW.js";import"./Modal.context-DQr9EoQJ.js";import"./useControllableState-CSEGMF6f.js";import"./Portal-BDp1vaYq.js";import"./useDescendant-B3NcaYHB.js";import"./useClientLayoutEffect-CeU_aQpQ.js";import"./DismissableLayer-DNIg-w_5.js";import"./Floating-Cy4-q4HL.js";import"./ChevronRight-Dwyre9Ff.js";const O={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,O as default};
