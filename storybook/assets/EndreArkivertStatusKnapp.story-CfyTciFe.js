import{r as i,j as e,e as p}from"./iframe-DLBscwX4.js";import{E as s}from"./EndreArkivertStatusModal-DK6zn-Pe.js";import{A as a}from"./ActionMenu-DRPLyuyB.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CDI5MJ_x.js";import"./OrganisasjonsnummerAlert-CT3mNF-L.js";import"./VStack-C-r64OhW.js";import"./BasePrimitive-DOmCgIwE.js";import"./List-BdX6uIHV.js";import"./Link-D-a-TIAE.js";import"./KandidatHendelseTag-C-x8wOj-.js";import"./Tag-BL3700Hs.js";import"./FileXMark-DJGKfgrL.js";import"./Trash-BvvQQDxF.js";import"./HandShakeHeart-C46_pyqZ.js";import"./Calendar-tBAFqpZ0.js";import"./ThumbUp-C0DH2c5u.js";import"./Table-ClCD6oGL.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-dwlesY8K.js";import"./format-DlB13mey.js";import"./match-BtuunVFV.js";import"./parseISO-CN6EaoMT.js";import"./parse-AIEoe5QS.js";import"./getDefaultOptions-U-0LeV48.js";import"./util-CFN44zkS.js";import"./Modal-Dt_mbh-2.js";import"./floating-ui.react-CEhCsSjr.js";import"./Date.Input-BTEgpACV.js";import"./useFormField-Z4agqtG7.js";import"./useControllableState-DUdA72BO.js";import"./ChevronDown-CJ7usCnG.js";import"./Modal.context-BrFXXAdt.js";import"./Portal-DcJm9XwR.js";import"./useDescendant-8h6ET8sX.js";import"./useClientLayoutEffect-CpvBLka_.js";import"./DismissableLayer-Dugh27ba.js";import"./ChevronRight-D5qu6zyC.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
