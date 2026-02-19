import{j as e,c as d,r as p}from"./iframe-BkwnODkR.js";import"./KandidatlisteContext-D-4uVWPX.js";import{A as i}from"./ActionMenu-EGPevOGd.js";import{S as m}from"./KandidatHendelseTag-De4Zw3Z3.js";import{S as u}from"./Trash-BT8t48RZ.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-BDhdoZcn.js";import"./VStack-B4OSq3lZ.js";import"./BasePrimitive-C1_nDZIv.js";import"./Box-CZ-_ucwy.js";import"./List-Bg7qnbjY.js";import"./Link-BPE5RNzw.js";import"./index-BZlQ4SQL.js";import"./index-B40KJ5b4.js";import"./util-lalAa7Dy.js";import"./Modal.context-YPIuINkw.js";import"./useControllableState-L1D98hI-.js";import"./Portal-CXCn18fQ.js";import"./useClientLayoutEffect-urkX9LtN.js";import"./FocusBoundary-BQDa0eaV.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-D_Pu96ju.js";import"./useOpenChangeAnimationComplete-VXuF-u-l.js";import"./useDescendant-blTgZSl_.js";import"./DismissableLayer-B1idZzRU.js";import"./Floating-3ACe2Bb4.js";import"./ChevronRight-Ccsa258R.js";import"./Tag-BbrVWz2H.js";import"./ChatExclamationmark-nqvYvLOF.js";import"./FileXMark-W4dzEAi9.js";import"./HandShakeHeart-DtBCaqJt.js";import"./Calendar-B3JE1Dmr.js";import"./ThumbUp-BMUN86gn.js";import"./ExclamationmarkTriangle-CJLZ4uuX.js";import"./Table-ZWT3Pxbg.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
