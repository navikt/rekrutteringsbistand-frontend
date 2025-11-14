import{r as i,j as e,d as l}from"./iframe-B5k7HgKP.js";import{E as s}from"./EndreArkivertStatusModal-Cii_f3It.js";import{A as a}from"./ActionMenu-CCikKP19.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CvPwwAd8.js";import"./OrganisasjonsnummerAlert-qh5-HCeD.js";import"./VStack-DwNyMrLP.js";import"./BasePrimitive-ChLjm-OF.js";import"./List-Dsa8NCSm.js";import"./Link-C19GH7by.js";import"./KandidatHendelseTag-CAWwf87G.js";import"./Tag-Da0f1wDh.js";import"./ChatExclamationmark-DnfOejm9.js";import"./FileXMark-BUypplJh.js";import"./Trash-fwld1poE.js";import"./HandShakeHeart-ZwdqVNvv.js";import"./Calendar-BWc64Fs3.js";import"./ThumbUp-D4CF9KsB.js";import"./Table-Bt_s7cRr.js";import"./util-DFhp_AVe.js";import"./parse-DdTbfJuI.js";import"./getDefaultOptions-C_GWPHaZ.js";import"./parseISO-Pc_TeQhl.js";import"./index-BiQOaXy7.js";import"./index-B40KJ5b4.js";import"./isBefore-Cyp7XTD_.js";import"./util-BxKh5lRO.js";import"./Modal-DlmypBx-.js";import"./floating-ui.react-BPABgFu6.js";import"./Date.Input-CmGT4RU1.js";import"./useFormField-BmZi7DJY.js";import"./useControllableState-CUN5WquP.js";import"./ChevronDown-CWuZpo8s.js";import"./Modal.context-BcWwb0YD.js";import"./Portal-DwiqRxZz.js";import"./useDescendant-CPgeBe8O.js";import"./useClientLayoutEffect-DKPCfDLv.js";import"./DismissableLayer-4lsa6TLq.js";import"./Floating-D9y8a0j-.js";import"./ChevronRight-D674mUOt.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
