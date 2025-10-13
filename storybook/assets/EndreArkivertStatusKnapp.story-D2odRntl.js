import{r as i,j as e,e as l}from"./iframe-BELOvKNN.js";import{E as s}from"./EndreArkivertStatusModal-Aync4p8V.js";import{A as a}from"./ActionMenu-DKH_YEtD.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CQM5FkxO.js";import"./OrganisasjonsnummerAlert-CSlWyPvV.js";import"./VStack-CVCIdyhk.js";import"./BasePrimitive-Mqp222lP.js";import"./List-DUbmPHIm.js";import"./Link-DnuL8IwU.js";import"./KandidatHendelseTag-Dye6zfEL.js";import"./Tag-Btm7kXcV.js";import"./FileXMark-6ZpgUhl2.js";import"./Trash-B9oLGwbt.js";import"./HandShakeHeart-Dp5wQ6aL.js";import"./Calendar-B9V_T85Q.js";import"./ThumbUp-yGDvx2kA.js";import"./Table-BgrymczM.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Dgy1Kk-2.js";import"./format-C8FmGALw.js";import"./match-D9qvYXIp.js";import"./parseISO-CZlVIeHX.js";import"./parse-CP0tnOZc.js";import"./getDefaultOptions-BpSXGg0b.js";import"./util-qK8gJWGj.js";import"./Modal-Bk-hnNOe.js";import"./floating-ui.react-m4wJbw6e.js";import"./Date.Input-3AqE9uYt.js";import"./useFormField-BaU1MW5p.js";import"./useControllableState-CZJeXb2k.js";import"./ChevronDown-CNBy5aG3.js";import"./Modal.context-DWOAM3YB.js";import"./Portal-C4Fh4h_T.js";import"./useDescendant-7y0uEY9z.js";import"./useClientLayoutEffect-CmE_1-f7.js";import"./DismissableLayer-BxOt-ZBD.js";import"./Floating-3-NXBcG9.js";import"./ChevronRight-BTAIsPRC.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
