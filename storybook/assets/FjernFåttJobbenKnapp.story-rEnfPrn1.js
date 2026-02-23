import{j as e,dO as c,c as m,r as g}from"./iframe-Du4ErrN9.js";import{A as o}from"./ActionMenu-CGUJlaQM.js";import{S as u}from"./MinusCircle-DqfJbR0h.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Cm1HpL9i.js";import"./useControllableState-SOyeuRM-.js";import"./Portal-C4fML_zd.js";import"./useClientLayoutEffect-_rHzf2V6.js";import"./FocusBoundary-DL9aFeFb.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BYwi5IAp.js";import"./useOpenChangeAnimationComplete-O3LPnYXK.js";import"./useDescendant-xaskNqQ2.js";import"./DismissableLayer-BkQSmu2f.js";import"./Floating-Ck90-JjU.js";import"./ChevronRight-BhCfBUQt.js";const d=({endreUtfallForKandidat:n,loading:s,lukketKandidatliste:i,actionMenu:p})=>p&&p?e.jsxs(o.Item,{onSelect:()=>n(c.PRESENTERT),children:[e.jsx(u,{})," Fjern registrer fått jobben"]}):e.jsx(m,{disabled:i,icon:e.jsx(u,{}),variant:"tertiary",size:"small",loading:s,onClick:()=>n(c.PRESENTERT),children:"Fjern fått jobben registreringen"});d.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const O={tags:["autodocs"],component:d},l=n=>alert("Utfall: "+n),r={args:{endreUtfallForKandidat:l,loading:!1}},t={args:{endreUtfallForKandidat:l,loading:!0}},a={args:{endreUtfallForKandidat:l,loading:!1,actionMenu:!0},render:n=>{const[s,i]=g.useState(!1);return e.jsxs(o,{open:s,onOpenChange:i,children:[e.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(o.Content,{children:e.jsx(d,{...n})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IMenu,r as Knapp,t as Laster,O as default};
