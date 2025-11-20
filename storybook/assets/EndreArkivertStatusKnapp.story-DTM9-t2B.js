import{r as i,j as e,d as l}from"./iframe-CVGSEgl3.js";import{E as s}from"./EndreArkivertStatusModal-B69J9J3H.js";import{A as a}from"./ActionMenu-CXjwmqqA.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DGP14m25.js";import"./OrganisasjonsnummerAlert-By_MGEFT.js";import"./VStack-Dym5gTnm.js";import"./BasePrimitive-qBIaQhXL.js";import"./List-ldPUU4Yb.js";import"./Link-DG13Hunt.js";import"./KandidatHendelseTag-DvxgqWDM.js";import"./Tag-CnwkgZqI.js";import"./ChatExclamationmark-B6I2EWTS.js";import"./FileXMark-Ckhc_Rov.js";import"./Trash-Dy2qWfjh.js";import"./HandShakeHeart-B2bLNKjs.js";import"./Calendar-CKqAy1uR.js";import"./ThumbUp-m3bzFOVG.js";import"./Table-BbJnIJYg.js";import"./dato-DcuCWi-y.js";import"./parse-DHV0IMgP.js";import"./getDefaultOptions-3hA47L1T.js";import"./parseISO-DOUqVw6G.js";import"./index-Dy4IngqS.js";import"./index-B40KJ5b4.js";import"./util-D6FEs9xz.js";import"./Modal-BCv-lyEN.js";import"./floating-ui.react-DKbBaBlE.js";import"./Date.Input-B3ercdvB.js";import"./useFormField-Cz3FfKKV.js";import"./useControllableState-BUYnv2tY.js";import"./ChevronDown-BS9qd_7E.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ghVn4P7G.js";import"./Modal.context-CBMF66yi.js";import"./Portal-qBc4W2xm.js";import"./useLatestRef-CLpRPFlw.js";import"./useDescendant-0QCBf2az.js";import"./DismissableLayer-BI4yZ3io.js";import"./Floating-BL2cgZHY.js";import"./ChevronRight-C-nCn4UC.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
