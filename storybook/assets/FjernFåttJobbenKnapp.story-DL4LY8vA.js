import{j as e,dO as c,c as m,r as g}from"./iframe-lXod11Sv.js";import{A as o}from"./ActionMenu-Ct-npc21.js";import{S as u}from"./MinusCircle-3BP8r53X.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CWktOTbF.js";import"./useControllableState-C7hOL0Vl.js";import"./Portal-RfHCz7_5.js";import"./useClientLayoutEffect-jxoLsiga.js";import"./FocusBoundary-BvC8MdpX.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-C62yDka1.js";import"./useOpenChangeAnimationComplete-Cr-ML3Xu.js";import"./useDescendant-B6M7gANj.js";import"./DismissableLayer-B2oOyXG2.js";import"./Floating-B36AN09h.js";import"./ChevronRight-CE5pcK5E.js";const d=({endreUtfallForKandidat:n,loading:s,lukketKandidatliste:i,actionMenu:p})=>p&&p?e.jsxs(o.Item,{onSelect:()=>n(c.PRESENTERT),children:[e.jsx(u,{})," Fjern registrer fått jobben"]}):e.jsx(m,{disabled:i,icon:e.jsx(u,{}),variant:"tertiary",size:"small",loading:s,onClick:()=>n(c.PRESENTERT),children:"Fjern fått jobben registreringen"});d.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const O={tags:["autodocs"],component:d},l=n=>alert("Utfall: "+n),r={args:{endreUtfallForKandidat:l,loading:!1}},t={args:{endreUtfallForKandidat:l,loading:!0}},a={args:{endreUtfallForKandidat:l,loading:!1,actionMenu:!0},render:n=>{const[s,i]=g.useState(!1);return e.jsxs(o,{open:s,onOpenChange:i,children:[e.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(o.Content,{children:e.jsx(d,{...n})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
