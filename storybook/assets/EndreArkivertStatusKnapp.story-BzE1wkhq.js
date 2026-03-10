import{j as e,a as d,r as p}from"./iframe-CneUl_wY.js";import"./KandidatlisteContext-g5QfYRYd.js";import{A as i}from"./ActionMenu-BUEMgiuC.js";import{S as m}from"./KandidatHendelseTag-B6sqlE6E.js";import{S as u}from"./Trash-C0OetAZt.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-Dx8_nFrY.js";import"./VStack-DVjxuJxR.js";import"./BasePrimitive-BCwzE-6u.js";import"./Box-B2ztMX1_.js";import"./List-CaVgrZTm.js";import"./Link-jdfO1Gmz.js";import"./dato-8F_fExdN.js";import"./format-e0twARLu.js";import"./en-US-CZDsp8GY.js";import"./match-DaDQSp9V.js";import"./parseISO-DVqmX80D.js";import"./parse-C8THUBPX.js";import"./getDefaultOptions-DJwx3b_O.js";import"./isSameDay-BaAWF3Hu.js";import"./index-BmchBEcx.js";import"./index-CWbL8d4M.js";import"./util-BMssmSNI.js";import"./Modal.context-Bz5WRdyL.js";import"./Portal-Csncu1Zo.js";import"./useDescendant-jW9NOdRN.js";import"./DismissableLayer-BYffSM5U.js";import"./Floating-4mfbkLJw.js";import"./useOpenChangeAnimationComplete-BAGFGoQK.js";import"./useValueAsRef-JQTR7f0l.js";import"./FocusBoundary-D-ZXsp7-.js";import"./useControllableState-B6yzSVwS.js";import"./ChevronRight-CZuV66j1.js";import"./Tag-DBrjzeu6.js";import"./ChatExclamationmark-UmU5dP_y.js";import"./FileXMark-DKeE6Fy9.js";import"./HandShakeHeart-Qy6P2tNi.js";import"./Calendar-CRsHPp4T.js";import"./ThumbUp-CMpeAaCf.js";import"./ExclamationmarkTriangle-C3UX1BPv.js";import"./Table-BlaNBB7V.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IHandlingMeny,o as SomKnapp,ee as default};
