import{j as e,c as d,r as p}from"./iframe-ogJKK8dt.js";import"./KandidatlisteContext-BVQmcTiH.js";import{A as i}from"./ActionMenu-KoEUr99N.js";import{S as m}from"./KandidatHendelseTag-ThwAB8GS.js";import{S as u}from"./Trash-BLQSm5Na.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-B4r86ma9.js";import"./VStack-yzZbQCBY.js";import"./BasePrimitive-DjusfcqA.js";import"./Box-ooNOMxMv.js";import"./List-CxZDaKVg.js";import"./Link-BEY9g3IO.js";import"./index-C5FF2Bxh.js";import"./index-B40KJ5b4.js";import"./util-DZUih_L4.js";import"./Modal.context-BTpjd2zQ.js";import"./useControllableState-CfJj0Xvi.js";import"./Portal-DAwVIVbK.js";import"./useClientLayoutEffect-D5xtevBN.js";import"./FocusBoundary-C5aikcYo.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-DdGuy_q4.js";import"./useOpenChangeAnimationComplete-iWbB2ZZY.js";import"./useDescendant-CXJe7p8c.js";import"./DismissableLayer-xsuFORDV.js";import"./Floating-F8bYIpvd.js";import"./ChevronRight-nQq9sUvO.js";import"./Tag-DVOjX6NO.js";import"./ChatExclamationmark-zXL3mRiD.js";import"./FileXMark-CoaNlJsI.js";import"./HandShakeHeart-DcAsaTni.js";import"./Calendar-Cy6HYWh_.js";import"./ThumbUp-C-XSNpl9.js";import"./ExclamationmarkTriangle-DzRfnHv7.js";import"./Table-B-JVjdBV.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
