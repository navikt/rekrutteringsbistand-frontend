import{r as i,j as e,d as l}from"./iframe-CkzMmpLa.js";import{E as s}from"./EndreArkivertStatusModal-DTif2VxY.js";import{A as a}from"./ActionMenu-bT1vT4CW.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B0DkhyJ5.js";import"./OrganisasjonsnummerAlert-BC6tnlJ7.js";import"./VStack-CEafswES.js";import"./BasePrimitive-CKAMW9nX.js";import"./Box-CdBUid5D.js";import"./List--_c70d5t.js";import"./Link-D5Rkt3KG.js";import"./KandidatHendelseTag-Cywuef7d.js";import"./Tag-W8lZEK2d.js";import"./ChatExclamationmark-CjXK0Yi-.js";import"./FileXMark-Dvxqx_pO.js";import"./Trash-rapViwFi.js";import"./HandShakeHeart-C54kqonb.js";import"./Calendar-SXw1zHFn.js";import"./ThumbUp-D25aHmVk.js";import"./ExclamationmarkTriangle-C26Wmt--.js";import"./Table-u8yvfB5y.js";import"./index-CtEzum-F.js";import"./index-B40KJ5b4.js";import"./util-DgmYyb6R.js";import"./Modal-F90IrM3f.js";import"./floating-ui.react-Wvsvcain.js";import"./useFormField-C6tQDjcO.js";import"./ReadMore-DMoTARwM.js";import"./useControllableState-mdfm_5Wi.js";import"./ChevronDown-BFqUtr1G.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CARqtUut.js";import"./Modal.context-DyolBz4N.js";import"./Portal-CqdLRxAN.js";import"./useValueAsRef-DxT7bC4F.js";import"./Floating-mIjOi-RO.js";import"./useDescendant-OH5FsVRu.js";import"./DismissableLayer-PtrKV-0-.js";import"./ChevronRight-pbLfvVX7.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
