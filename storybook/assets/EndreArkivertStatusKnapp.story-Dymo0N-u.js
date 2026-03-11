import{j as e,a as d,r as p}from"./iframe-B9EIERAQ.js";import"./KandidatlisteContext-B3uABJSX.js";import{A as i}from"./ActionMenu-SfhNrfiY.js";import{S as m}from"./KandidatHendelseTag-ByIjOx-o.js";import{S as u}from"./Trash-DAldqpgv.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CR-TCWdO.js";import"./VStack-Dy4xRJaM.js";import"./BasePrimitive-okBwE8Ge.js";import"./Box-ByLIj58o.js";import"./List-C3lxDxOD.js";import"./Link-DmJvsI4e.js";import"./dato-BM2vGqf6.js";import"./format-DmSMY60N.js";import"./en-US-5rbPq74o.js";import"./match-BNzN7Mxu.js";import"./parseISO-CaTi8wH-.js";import"./parse-rS6AgNhC.js";import"./getDefaultOptions-9vdk47zt.js";import"./isSameDay-C7GJG5VT.js";import"./index-DHP1TQEp.js";import"./index-CWbL8d4M.js";import"./util-CxacG2RW.js";import"./Modal.context-BLDLPEvc.js";import"./Portal-Bbmc0y0W.js";import"./useDescendant-Snxu4iZa.js";import"./DismissableLayer-CXLcXTCV.js";import"./Floating-C-C3mgAg.js";import"./useOpenChangeAnimationComplete-DAZqwCsf.js";import"./useValueAsRef-X2zQ96xY.js";import"./FocusBoundary-B1GE2EIP.js";import"./useControllableState-UfBjBAk3.js";import"./ChevronRight-Czcdu2Do.js";import"./Tag-DIDn8Nt2.js";import"./ChatExclamationmark-BTFjrLKH.js";import"./FileXMark-BToMMGE1.js";import"./HandShakeHeart-B01ivSUL.js";import"./Calendar-BjKd7Qze.js";import"./ThumbUp-DijIWXld.js";import"./ExclamationmarkTriangle-CoHKIESC.js";import"./Table-C3HmYiSq.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
