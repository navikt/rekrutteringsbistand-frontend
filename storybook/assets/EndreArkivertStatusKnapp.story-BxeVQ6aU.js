import{r as i,j as e,d as l}from"./iframe-H0yXMhS1.js";import{E as s}from"./EndreArkivertStatusModal-utE1wXmj.js";import{A as a}from"./ActionMenu-7SRNOsHs.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CstOaRqK.js";import"./OrganisasjonsnummerAlert-DgqamFsY.js";import"./VStack-DuONN55V.js";import"./BasePrimitive-BySfJsgO.js";import"./List-CRqFUcZT.js";import"./Link-DjgNZ7Vx.js";import"./KandidatHendelseTag-DMO9BgC6.js";import"./Tag-CQgnWam6.js";import"./ChatExclamationmark-DH6ks_jL.js";import"./FileXMark-B_lp7Wpe.js";import"./Trash-4WmyzpwM.js";import"./HandShakeHeart--NoS2pbw.js";import"./Calendar-B6CKet49.js";import"./ThumbUp-EBUKBeKD.js";import"./Table-BG7Ck02Y.js";import"./util-B1yZnOMj.js";import"./format-BYB0Al8D.js";import"./match-CE8FlIHe.js";import"./parse-xp8_Zj_H.js";import"./getDefaultOptions-CtDkAiXh.js";import"./parseISO-CxhTcv8Q.js";import"./index-Btc70d1l.js";import"./index-B40KJ5b4.js";import"./isBefore-Bec-1C9E.js";import"./util-BbrPoFAq.js";import"./Modal-KxOY_8Qo.js";import"./floating-ui.react-DR0cSvZz.js";import"./Date.Input-BgeletWy.js";import"./useFormField-BlZm1T9Z.js";import"./useControllableState-B0Zl1xS9.js";import"./ChevronDown-kwX6RnPU.js";import"./Modal.context-B1iRXIBr.js";import"./Portal-0Xm9zPqG.js";import"./useDescendant-vLD5m-34.js";import"./useClientLayoutEffect-D6WCDnon.js";import"./DismissableLayer-DJKR5cfd.js";import"./Floating-Bl0f4d36.js";import"./ChevronRight-DpDJ7q34.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
