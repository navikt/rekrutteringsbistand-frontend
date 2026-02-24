import{j as e,c as d,r as p}from"./iframe-lXod11Sv.js";import"./KandidatlisteContext-4diR-jMI.js";import{A as i}from"./ActionMenu-Ct-npc21.js";import{S as m}from"./KandidatHendelseTag-Jwpufq8X.js";import{S as u}from"./Trash-acfX7XoS.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-Dlr7MwJJ.js";import"./VStack-DAwc_0ue.js";import"./BasePrimitive-ByOs4gr-.js";import"./Box-4m2HeBex.js";import"./List-oV3WafVY.js";import"./Link-Cr-Gd9h1.js";import"./index-BFbI1gfX.js";import"./index-B40KJ5b4.js";import"./util-DmE3tY_K.js";import"./Modal.context-CWktOTbF.js";import"./useControllableState-C7hOL0Vl.js";import"./Portal-RfHCz7_5.js";import"./useClientLayoutEffect-jxoLsiga.js";import"./FocusBoundary-BvC8MdpX.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-C62yDka1.js";import"./useOpenChangeAnimationComplete-Cr-ML3Xu.js";import"./useDescendant-B6M7gANj.js";import"./DismissableLayer-B2oOyXG2.js";import"./Floating-B36AN09h.js";import"./ChevronRight-CE5pcK5E.js";import"./Tag-DN2M0MRu.js";import"./ChatExclamationmark-wqPXtHZ6.js";import"./FileXMark-BX3-txRm.js";import"./HandShakeHeart-CwcS-b4L.js";import"./Calendar-CJL4dQ4A.js";import"./ThumbUp-C1T-4xnl.js";import"./ExclamationmarkTriangle-2NGkG3xT.js";import"./Table-DboZdKYO.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,V as default};
