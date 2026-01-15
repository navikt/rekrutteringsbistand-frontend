import{r as i,j as e,d as p}from"./iframe-Bj5Axd2a.js";import{E as s}from"./EndreArkivertStatusModal-CXgSvV6r.js";import{A as a}from"./ActionMenu-CaXibYMQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-_P279Ly7.js";import"./OrganisasjonsnummerAlert-CRCkZtle.js";import"./VStack-Dupokvod.js";import"./BasePrimitive-cTR1YpC5.js";import"./List-d0CjXUih.js";import"./Link-WQBFb_AD.js";import"./KandidatHendelseTag-BvMAo_wz.js";import"./Tag-Bnz-8_u2.js";import"./ChatExclamationmark-dFgH5DKp.js";import"./FileXMark-BpCAMeUo.js";import"./Trash-pUZYdyL5.js";import"./HandShakeHeart-C2hjOipz.js";import"./Calendar-C1HI89R9.js";import"./ThumbUp-DCJbsUd4.js";import"./ExclamationmarkTriangle-DiXuGWym.js";import"./Table-CPOhTROf.js";import"./index-nohZSnzY.js";import"./index-B40KJ5b4.js";import"./util-CK_ZSrem.js";import"./Modal-Cxw77nFT.js";import"./floating-ui.react-lQrPabDz.js";import"./Date.Input-B6M7frCw.js";import"./useFormField-f0voTv_i.js";import"./useControllableState-Cl8hL-Ro.js";import"./ChevronDown-DHnTEC1o.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVS_CXbr.js";import"./Modal.context-C6n_bFcK.js";import"./Portal-DcSuAbBV.js";import"./useLatestRef-DSwrDrUo.js";import"./useDescendant-Y6L1gqwW.js";import"./DismissableLayer-DKDlAsE7.js";import"./Floating-nMGgBXvm.js";import"./ChevronRight-BvmsDdd_.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
