import{r as i,j as e,d as p}from"./iframe-DLcFPOQU.js";import{E as s}from"./EndreArkivertStatusModal-CcEoPiEK.js";import{A as a}from"./ActionMenu-By4U1fQQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DOCnuYM1.js";import"./OrganisasjonsnummerAlert-BeegMXwe.js";import"./VStack-WlCR9Jmi.js";import"./BasePrimitive-D2jpHuoC.js";import"./Box-DVzxHLWM.js";import"./List-D0BKDGOo.js";import"./Link-CAMq_i6s.js";import"./KandidatHendelseTag-BiqlCmrf.js";import"./Tag-cr-amcGI.js";import"./ChatExclamationmark-CNWMMC5w.js";import"./FileXMark-CI6cgFU2.js";import"./Trash-4_6yTjs7.js";import"./HandShakeHeart-DTPUZIKy.js";import"./Calendar-C6Zg2cWW.js";import"./ThumbUp-BXZGtsXc.js";import"./Table-DBHMMNrv.js";import"./index-DpMfSoWt.js";import"./index-B40KJ5b4.js";import"./util-CY7Z07jd.js";import"./Modal-C2Cl2qrx.js";import"./floating-ui.react-yTmGsUf2.js";import"./useFormField-ByT3rDr1.js";import"./ReadMore-ce-gQrKG.js";import"./useControllableState-klXAuQpk.js";import"./ChevronDown-DjYatFtJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C8cW1GFx.js";import"./Modal.context-DE-XYzXq.js";import"./Portal-CDE48S_n.js";import"./useValueAsRef-BSJ7xw7j.js";import"./Floating-XBKqXmG6.js";import"./useDescendant-Bh34eNTl.js";import"./DismissableLayer-CFcBKd-R.js";import"./ChevronRight-507tYxdX.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
