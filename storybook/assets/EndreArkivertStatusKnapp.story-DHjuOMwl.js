import{j as e,c as d,r as p}from"./iframe-6grgfNuj.js";import"./KandidatlisteContext-BFjEZzBr.js";import{A as i}from"./ActionMenu-fH2KYbio.js";import{S as m}from"./KandidatHendelseTag-TZUBJy0X.js";import{S as u}from"./Trash-TGNXr0wn.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DsfkeHa-.js";import"./VStack-CTB3Y52A.js";import"./BasePrimitive-DR-aDBsu.js";import"./Box-CK2Li0_5.js";import"./List-CM4ShwvY.js";import"./Link-BRwCl624.js";import"./index-DSAtEe8m.js";import"./index-CWbL8d4M.js";import"./util-C11T6ZGq.js";import"./Modal.context-BR8CsQUC.js";import"./Portal-FqdjYG7y.js";import"./useDescendant-BgwuvurT.js";import"./DismissableLayer-B5InjWix.js";import"./Floating-CzvvOq8h.js";import"./useOpenChangeAnimationComplete-BWOTeHkL.js";import"./useValueAsRef-BpvAmrfu.js";import"./FocusBoundary-D9-FZCi7.js";import"./useControllableState-BuBm39MZ.js";import"./ChevronRight-gGE6UnNh.js";import"./Tag-BIKce9wR.js";import"./ChatExclamationmark-DPtL5bGC.js";import"./FileXMark-D3Tr9pSa.js";import"./HandShakeHeart-C4xjHM94.js";import"./Calendar-DaTFZjkE.js";import"./ThumbUp-DATi4Mtr.js";import"./ExclamationmarkTriangle-oc4PZQJc.js";import"./Table-hjJr4_8A.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
