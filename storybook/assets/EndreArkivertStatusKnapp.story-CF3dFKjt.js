import{r as i,j as e,d as p}from"./iframe-BgMEyBOw.js";import{E as s}from"./EndreArkivertStatusModal-wrMccBt_.js";import{A as a}from"./ActionMenu-BdEs5ozm.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BB8zXL-X.js";import"./OrganisasjonsnummerAlert-BCWEq8UM.js";import"./VStack-UU3jl9Ja.js";import"./BasePrimitive-R1dwLZrY.js";import"./List-Dber_rM4.js";import"./Link-yB4QutwC.js";import"./KandidatHendelseTag-CeV_QMPr.js";import"./Tag-B6UGrW1v.js";import"./FileXMark-B_uorPd8.js";import"./Trash-7Fs5dgHD.js";import"./HandShakeHeart-D-9O9Vx_.js";import"./Calendar-CwaqC0M5.js";import"./ThumbUp-Cgu-bFYT.js";import"./Table-V3muIp_l.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-D0AmwIr_.js";import"./format-DrrAGn9F.js";import"./match-BHTYdbS3.js";import"./parseISO-Dei-hLif.js";import"./parse-C_zuhUlz.js";import"./getDefaultOptions-CTpR1hvo.js";import"./util-D49phOLu.js";import"./Modal-BYLl8Pr3.js";import"./floating-ui.react-DBIgfcER.js";import"./Date.Input-B-XhQLT9.js";import"./useFormField-Bp_i8G6K.js";import"./useControllableState-q6FKqWzx.js";import"./ChevronDown-DgJvjKl7.js";import"./Modal.context-D-Q3Jf-p.js";import"./Portal-BXUN-EM4.js";import"./useDescendant-DkEoju_L.js";import"./useClientLayoutEffect-VQhd_znX.js";import"./DismissableLayer-DPVbJItl.js";import"./ChevronRight-Dh6ZOc5_.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
