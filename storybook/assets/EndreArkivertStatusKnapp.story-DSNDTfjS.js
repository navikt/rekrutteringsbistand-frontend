import{r as i,j as e,d as l}from"./iframe-BovJDKCI.js";import{E as s}from"./EndreArkivertStatusModal-CfrFnSII.js";import{A as a}from"./ActionMenu-BKnBmqfv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C-Dx5kZ7.js";import"./OrganisasjonsnummerAlert-C4zHqR64.js";import"./VStack-D0AMLDXW.js";import"./BasePrimitive-BAxo2HmN.js";import"./List-7fyXgRE7.js";import"./Link-ClZLbEY_.js";import"./KandidatHendelseTag-C1qTQJ1v.js";import"./Tag-66WObbC1.js";import"./ChatExclamationmark-PLiAFIos.js";import"./FileXMark-CMhkvzRw.js";import"./Trash-C73CBX-Y.js";import"./HandShakeHeart-D4l4aMNW.js";import"./Calendar-DBuloJTq.js";import"./ThumbUp-wYJMbsDb.js";import"./Table-BNJX2O-z.js";import"./util-CUxBDTGI.js";import"./parse-BgrplRoJ.js";import"./getDefaultOptions-DK2iPdcc.js";import"./parseISO-C4snc2Vp.js";import"./index-CWVRmJSY.js";import"./index-B40KJ5b4.js";import"./isBefore-9mWIkaPW.js";import"./util-CVUTdVUi.js";import"./Modal-BS1wt9c9.js";import"./floating-ui.react-DZFgd5ZI.js";import"./Date.Input-ewhvnWIO.js";import"./useFormField-BNZ4k9l9.js";import"./useControllableState-Cohy2CnX.js";import"./ChevronDown-CJWPnQMx.js";import"./Modal.context-Dd1l30yo.js";import"./Portal-BEVJdrgq.js";import"./useDescendant-CJ6XBlhU.js";import"./useClientLayoutEffect-H9RrTIbx.js";import"./DismissableLayer-CJbI8_1U.js";import"./Floating-CgP_O5WE.js";import"./ChevronRight-D9PSb1x1.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
