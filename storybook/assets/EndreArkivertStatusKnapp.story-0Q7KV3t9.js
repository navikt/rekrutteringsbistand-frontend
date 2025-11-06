import{r as i,j as e,d as l}from"./iframe-CEi1Y25_.js";import{E as s}from"./EndreArkivertStatusModal-C30TVdXN.js";import{A as a}from"./ActionMenu-CTwx9Atr.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-TAReqAQp.js";import"./OrganisasjonsnummerAlert-C2Fjy2Cg.js";import"./VStack-DlvQwrPr.js";import"./BasePrimitive-CD_PpSbA.js";import"./List-FWr8GfD0.js";import"./Link-0dmJDKCO.js";import"./KandidatHendelseTag-Df_A10P1.js";import"./Tag-iDGw-CbN.js";import"./ChatExclamationmark-8Cd2OGy8.js";import"./FileXMark-DU6zhDkh.js";import"./Trash-kg8E1TW2.js";import"./HandShakeHeart-C9Te7JJb.js";import"./Calendar-DhPZD4re.js";import"./ThumbUp-xwS0PIcU.js";import"./Table-D3jKUWh5.js";import"./util-B4XJVmFy.js";import"./parse-DdCTVvrf.js";import"./getDefaultOptions-nDgdeQR6.js";import"./parseISO-Bt7bxBvf.js";import"./index-Cttkei0V.js";import"./index-B40KJ5b4.js";import"./isBefore-CVoWPQY4.js";import"./util-2HP5K3Gr.js";import"./Modal--UxcAcH0.js";import"./floating-ui.react-B7ONW0ON.js";import"./Date.Input-CZrglUtk.js";import"./useFormField-DQy04blY.js";import"./useControllableState-BYJP4Qy4.js";import"./ChevronDown-05eodRTg.js";import"./Modal.context-vOD-2fLT.js";import"./Portal-Bw0saJbl.js";import"./useDescendant-Ct6WCee5.js";import"./useClientLayoutEffect-DF_7u9uO.js";import"./DismissableLayer-BtFa0zwB.js";import"./Floating-BK8URA97.js";import"./ChevronRight-Bj3UX8tS.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
