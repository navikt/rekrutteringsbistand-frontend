import{r as i,j as e,d as l}from"./iframe-eUZc9IfG.js";import{E as s}from"./EndreArkivertStatusModal-DlMW3ViD.js";import{A as a}from"./ActionMenu-CDT79EY2.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BaofHeHy.js";import"./OrganisasjonsnummerAlert-CLVHW0AS.js";import"./VStack-D2Q4wvGm.js";import"./BasePrimitive-BRb4WXsy.js";import"./Box-DdDP5BvY.js";import"./List-ywpDV0pm.js";import"./Link-DQzGJyIQ.js";import"./KandidatHendelseTag-BNbvxaRH.js";import"./Tag-AwytiWVx.js";import"./ChatExclamationmark-99GpV8ND.js";import"./FileXMark-DgKNeLBr.js";import"./Trash-9L1LQghJ.js";import"./HandShakeHeart-i_x7RuNX.js";import"./Calendar-B-bYWFjj.js";import"./ThumbUp-URkaQQLm.js";import"./ExclamationmarkTriangle-BYGexLrb.js";import"./Table-Cb0Zq12V.js";import"./index-DgdLY_0B.js";import"./index-B40KJ5b4.js";import"./util-DuNLAiOk.js";import"./Modal-8rEatQJm.js";import"./floating-ui.react-BUuraGRi.js";import"./useFormField-CN7RQPDC.js";import"./ReadMore-O--1zaa4.js";import"./useControllableState-Becg88hF.js";import"./ChevronDown-BvEmE2ly.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BJpTkOfa.js";import"./Modal.context-BIF9Tjeq.js";import"./Portal-Sxhxb8JS.js";import"./useValueAsRef-BIBmpn5w.js";import"./Floating-sz1mxhxq.js";import"./useDescendant-CISw4Ovu.js";import"./DismissableLayer-BJaKTL7j.js";import"./ChevronRight-DnX4lRv5.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
