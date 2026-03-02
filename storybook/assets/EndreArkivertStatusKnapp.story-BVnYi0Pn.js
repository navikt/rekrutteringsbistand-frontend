import{j as e,c as d,r as p}from"./iframe-BTwVuC5L.js";import"./KandidatlisteContext-DUtffNt7.js";import{A as i}from"./ActionMenu-CvF2hsB-.js";import{S as m}from"./KandidatHendelseTag-DLUayBID.js";import{S as u}from"./Trash-CJqtVo0F.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-B9TBo-GY.js";import"./VStack-BrnQe_V7.js";import"./BasePrimitive-CDk_2M2M.js";import"./Box-C9e24u4h.js";import"./List-Dg_uyu7Q.js";import"./Link-B2N88QCs.js";import"./index-CnHQ6l6K.js";import"./index-CWbL8d4M.js";import"./util-CuzWVfDu.js";import"./Modal.context-D4oMjfsL.js";import"./Portal-nFetCy0s.js";import"./useDescendant-BQKRfmWs.js";import"./DismissableLayer-CO08JDep.js";import"./Floating-re-SCD26.js";import"./useOpenChangeAnimationComplete-ChVOzh1L.js";import"./useValueAsRef-BuraLzJT.js";import"./FocusBoundary-BDWOYV4i.js";import"./useControllableState-BJWM5CP3.js";import"./ChevronRight-Bd0TqoJb.js";import"./Tag-CRCf0WCW.js";import"./ChatExclamationmark-C7HSgIVf.js";import"./FileXMark-pcQo6V67.js";import"./HandShakeHeart-ahITAjlG.js";import"./Calendar-D7o4SdbH.js";import"./ThumbUp-BYu4FHGa.js";import"./ExclamationmarkTriangle-BFIoRgNN.js";import"./Table-B2jJF36c.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    return <EndreArkivertStatusKnapp modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />;
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    actionMenu: true,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Åpne meny
        </Button>
        <ActionMenu.Content>
          <EndreArkivertStatusKnapp actionMenu modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,P as default};
