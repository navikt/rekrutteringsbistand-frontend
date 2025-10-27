import{r as i,j as e,o as l}from"./iframe-D0f7J1nY.js";import{E as s}from"./EndreArkivertStatusModal-ffbczCW3.js";import{A as a}from"./ActionMenu-SWG6sTVa.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DyFagPG4.js";import"./OrganisasjonsnummerAlert-CH6yCm4M.js";import"./VStack-zAsIOaWi.js";import"./BasePrimitive-_B0tGX77.js";import"./List-01d2Ok0m.js";import"./Link-CVBcNhat.js";import"./KandidatHendelseTag-DGTUG4F0.js";import"./Tag-C3Wthr0B.js";import"./ChatExclamationmark-Dz5EKjCZ.js";import"./FileXMark-CI7Dy0MH.js";import"./Trash-CtpFpmK8.js";import"./HandShakeHeart-e28kC94C.js";import"./Calendar-BUSnok4u.js";import"./ThumbUp-DJsI1PwY.js";import"./Table-DNUQiUTR.js";import"./util-C9AS3FCi.js";import"./format-DEtrES72.js";import"./match-DEtL1OMk.js";import"./parse-0EL43YaE.js";import"./getDefaultOptions-BEAVjXe_.js";import"./parseISO-D0I4fR8a.js";import"./index-Bucijd2D.js";import"./index-B40KJ5b4.js";import"./isBefore-BYhlh3_7.js";import"./util-2JKmsimX.js";import"./Modal-DyMT9DVy.js";import"./floating-ui.react-wf1Om8PO.js";import"./Date.Input-DV87Ki3V.js";import"./useFormField-BUhWNJci.js";import"./useControllableState-CqeC_HD5.js";import"./ChevronDown-gEqybSmK.js";import"./Modal.context-Byy9zaEN.js";import"./Portal-CpKF6t0Q.js";import"./useDescendant-Dgila3fS.js";import"./useClientLayoutEffect-BIx7NCwy.js";import"./DismissableLayer-weKq368f.js";import"./Floating-DMZ0EJf-.js";import"./ChevronRight-TzmmjE0e.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
