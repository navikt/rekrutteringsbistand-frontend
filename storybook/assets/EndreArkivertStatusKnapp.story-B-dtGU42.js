import{r as i,j as e,d as l}from"./iframe-BHoMFX67.js";import{E as s}from"./EndreArkivertStatusModal-UiSvkemw.js";import{A as a}from"./ActionMenu-CPtUz0Ly.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BIJDxCd7.js";import"./OrganisasjonsnummerAlert-CtyKFJ16.js";import"./VStack-Cb4Fd9NL.js";import"./BasePrimitive-BGvCM3ff.js";import"./List-Ba5nzO8b.js";import"./Link-CfecVY-4.js";import"./KandidatHendelseTag-Bo0o7sHX.js";import"./Tag-DCWS9W5D.js";import"./ChatExclamationmark-DL4qS7ce.js";import"./FileXMark-BVRHyc_E.js";import"./Trash-BTATC9D6.js";import"./HandShakeHeart-DzqcfAnc.js";import"./Calendar-C88ffwOa.js";import"./ThumbUp-Cg6pKAH2.js";import"./Table-Cgi7RIp6.js";import"./util-D6kNqDHc.js";import"./parse-BRSXN0qK.js";import"./getDefaultOptions-DBXf_iNK.js";import"./parseISO-CNxmnplC.js";import"./index-DLOipvgg.js";import"./index-B40KJ5b4.js";import"./isBefore-BK0dGRff.js";import"./util-BVx09jAu.js";import"./Modal-DBr1nkbn.js";import"./floating-ui.react-rhOpBHqT.js";import"./Date.Input-DFcY_nsR.js";import"./useFormField-LKhzjTW5.js";import"./useControllableState-Diyq5Leq.js";import"./ChevronDown-BdJQRWr_.js";import"./Modal.context-CZsrP9EO.js";import"./Portal-YEiB29xO.js";import"./useDescendant-DbiH3W67.js";import"./useClientLayoutEffect-CdSSBJMX.js";import"./DismissableLayer-8LE6nfrO.js";import"./Floating-BIDveAmm.js";import"./ChevronRight-BQPxO7KC.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
