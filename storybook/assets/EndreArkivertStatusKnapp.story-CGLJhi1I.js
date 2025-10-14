import{r as i,j as e,e as p}from"./iframe-qbxWu-tL.js";import{E as s}from"./EndreArkivertStatusModal-Dw1U2F94.js";import{A as a}from"./ActionMenu-BZXn6VKS.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BD3InuPO.js";import"./OrganisasjonsnummerAlert-BWKDpgDo.js";import"./VStack-B7tXZA4Y.js";import"./BasePrimitive-DyceG6iL.js";import"./List-az-G9Gs6.js";import"./Link-CMfq6tzZ.js";import"./KandidatHendelseTag-BPmdHITi.js";import"./Tag-Da1ytOY7.js";import"./FileXMark-CyLkFvxR.js";import"./Trash-DwQmtt3l.js";import"./HandShakeHeart-BEAefxb0.js";import"./Calendar-DZnwDkgC.js";import"./ThumbUp-C8ckDx0E.js";import"./Table-Bpm0fpGA.js";import"./util-DlAq864K.js";import"./format-DZhR8Qj7.js";import"./match-D2AgsI69.js";import"./parseISO-OQUDCsPR.js";import"./parse-hffK4nP2.js";import"./getDefaultOptions-BSPEM21I.js";import"./util-C1rHrxvH.js";import"./Modal-BdvvbpSe.js";import"./floating-ui.react-DtoBFu6j.js";import"./Date.Input-DXqbNpVA.js";import"./useFormField-Bw2yyyAS.js";import"./useControllableState-BJR-n7iR.js";import"./ChevronDown-CHhAtIRd.js";import"./Modal.context-DGzify1k.js";import"./Portal-D8rOpleD.js";import"./useDescendant-CAxsx0tC.js";import"./useClientLayoutEffect-DGkSbMMl.js";import"./DismissableLayer-DSDzd3Gi.js";import"./Floating-CvNiLyQ_.js";import"./ChevronRight-B6tWdIic.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
