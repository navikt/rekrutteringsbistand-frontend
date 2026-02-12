import{r as b,b as j,R as c,j as o,cA as f,h as y}from"./iframe-DAHX0Bjj.js";import{A as p}from"./ActionMenu-DqhIx9-z.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BS0nfZmi.js";import"./useControllableState-BS1X3OKI.js";import"./Portal-CBSMkkY-.js";import"./useClientLayoutEffect-C4MzY1kV.js";import"./FocusBoundary-L2LTUl-7.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BJt7ifOO.js";import"./useOpenChangeAnimationComplete-0KADCysP.js";import"./useDescendant-BrQzWGHe.js";import"./DismissableLayer-DqBDfLE9.js";import"./Floating-Q_0j6Cqx.js";import"./ChevronRight-CUGqtJKD.js";var h=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n};const g=b.forwardRef((e,r)=>{var{title:n,titleId:t}=e,a=h(e,["title","titleId"]);let s=j();return s=n?t||"title-"+s:void 0,c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:r,"aria-labelledby":s},a),n?c.createElement("title",{id:s},n):null,c.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-4.5 9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),u=({endreUtfallForKandidat:e,loading:r,lukketKandidatliste:n,actionMenu:t})=>t&&t?o.jsxs(p.Item,{onSelect:()=>e(f.PRESENTERT),children:[o.jsx(g,{})," Fjern registrer fått jobben"]}):o.jsx(y,{disabled:n,icon:o.jsx(g,{}),variant:"tertiary",size:"small",loading:r,onClick:()=>e(f.PRESENTERT),children:"Fjern fått jobben registreringen"});u.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const _={tags:["autodocs"],component:u},m=e=>alert("Utfall: "+e),i={args:{endreUtfallForKandidat:m,loading:!1}},l={args:{endreUtfallForKandidat:m,loading:!0}},d={args:{endreUtfallForKandidat:m,loading:!1,actionMenu:!0},render:e=>{const[r,n]=b.useState(!1);return o.jsxs(p,{open:r,onOpenChange:n,children:[o.jsx(y,{as:p.Trigger,size:"small",variant:"secondary",children:"Meny"}),o.jsx(p.Content,{children:o.jsx(u,{...e})})]})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: true
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};export{d as IMenu,i as Knapp,l as Laster,_ as default};
