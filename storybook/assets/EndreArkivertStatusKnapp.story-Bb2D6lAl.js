import{r as i,j as e,e as p}from"./iframe-7eHG5h_U.js";import{E as s}from"./EndreArkivertStatusModal-BU58rvkM.js";import{A as a}from"./ActionMenu-XowCnlIE.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnG2yZZF.js";import"./OrganisasjonsnummerAlert-yxmlgvWb.js";import"./VStack-Bn24QnTO.js";import"./BasePrimitive-_gW3khcb.js";import"./List-CU38lByH.js";import"./Link-nxBccCCM.js";import"./KandidatHendelseTag-DqvuH8sL.js";import"./Tag-CCAZ-Ukh.js";import"./FileXMark-MhiY1pg_.js";import"./Trash-g2QxdwJW.js";import"./HandShakeHeart-CHdc252e.js";import"./Calendar-BLomWIBv.js";import"./ThumbUp-FdCUfIUT.js";import"./Table-ITv2gwZr.js";import"./util-C9Af0tKE.js";import"./format-B6AGnuRA.js";import"./match-ZJSMZWUP.js";import"./parseISO-DqOfLv4e.js";import"./parse-CKYxhVP8.js";import"./getDefaultOptions-hi6Mw6xh.js";import"./util-B-tfxij0.js";import"./Modal-C0Fdt4rX.js";import"./floating-ui.react-DZKdw4va.js";import"./Date.Input-DUSVmfk7.js";import"./useFormField-DtXzDAXc.js";import"./useControllableState-CTVR2G-L.js";import"./ChevronDown-0ue-sR1C.js";import"./Modal.context-fguPQkN6.js";import"./Portal-BxNPnNCx.js";import"./useDescendant-BM1MCWSW.js";import"./useClientLayoutEffect-BGScRAc0.js";import"./DismissableLayer-DwDXwodQ.js";import"./Floating-Bu9ViNvm.js";import"./ChevronRight-BPDOc7Pf.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
