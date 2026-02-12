import{j as e,h as d,r as p}from"./iframe-B9ThPlmd.js";import"./KandidatlisteContext-D-IInopN.js";import{A as i}from"./ActionMenu-9H6wAmK5.js";import{S as m}from"./KandidatHendelseTag-Bg5oh_TX.js";import{S as u}from"./Trash-BJGu2QsA.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-C7A2Bp_A.js";import"./VStack-C9loVM5x.js";import"./BasePrimitive--eQQOU-u.js";import"./Box-Ia3ryaQk.js";import"./List-CACoCc-U.js";import"./Link-DibQlNmm.js";import"./index-C4ZI2FHj.js";import"./index-B40KJ5b4.js";import"./util-B99gwcAI.js";import"./Modal.context-DV_1AUnC.js";import"./useControllableState-gfKYrbxX.js";import"./Portal-AAN2Uv5O.js";import"./useClientLayoutEffect-CKGmPh56.js";import"./FocusBoundary-B75ACY4m.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BiUYEL9T.js";import"./useOpenChangeAnimationComplete-B035Vj6M.js";import"./useDescendant-ZCjADTAh.js";import"./DismissableLayer-COmNmYLB.js";import"./Floating-CYk4_d-t.js";import"./ChevronRight-DjYz4-Pp.js";import"./Tag-arhPIFDs.js";import"./ChatExclamationmark-_hz7dHBt.js";import"./FileXMark-CtT02kn6.js";import"./HandShakeHeart-DL-fDko_.js";import"./Calendar-BI75P9P5.js";import"./ThumbUp-B_LqSMfb.js";import"./ExclamationmarkTriangle-B5GxJVlA.js";import"./Table-Dxd5L6-e.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
