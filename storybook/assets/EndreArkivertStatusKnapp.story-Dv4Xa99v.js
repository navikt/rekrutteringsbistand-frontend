import{r as i,j as t,b as l}from"./iframe-BZGI7Ig_.js";import{E as s}from"./EndreArkivertStatusModal-DyDz0GbE.js";import{A as a}from"./ActionMenu-CitvQqBc.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C78b2UBh.js";import"./OrganisasjonsnummerAlert-svrmRo8s.js";import"./VStack-CJffh7sy.js";import"./BasePrimitive-Dl-LHXGo.js";import"./List-CSL1zfoc.js";import"./Link-D091lGCu.js";import"./KandidatHendelseTag-D-j5Jvgt.js";import"./Tag-BDSeVM5B.js";import"./FileXMark-W-BAfzMc.js";import"./Trash-ZF0t-SRt.js";import"./HandShakeHeart-Bq1y94Ar.js";import"./Calendar-BbDlJIM5.js";import"./ThumbUp-C2gsDPJF.js";import"./Table-Sv3lnO08.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-nc4EAXcZ.js";import"./format-DCzO9vOU.js";import"./startOfDay-lTP3GKUn.js";import"./match-DCN6kGAU.js";import"./parseISO-DJIM71K9.js";import"./parse-CG8pKw-3.js";import"./getDefaultOptions-YA01bVNM.js";import"./util-Bzm_XTyQ.js";import"./StillingsContext-0iH-_-OF.js";import"./index-DZOmuGKb.js";import"./index-aGn2uf-9.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./stilling.dto-Dd_wOmtL.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./SWRLaster-BBaxFb3n.js";import"./Feilmelding-G6ggJxep.js";import"./CopyButton-5dj8m9cm.js";import"./Checkmark-DLuShYHm.js";import"./Sidelaster-BMfr2Uml.js";import"./Modal-0KuFj30Z.js";import"./floating-ui.react-CePIoC5e.js";import"./Date.Input-Cog2CMqs.js";import"./useFormField-Czj1vEkU.js";import"./useControllableState-DL5RPXQs.js";import"./ChevronDown-BQhdyX28.js";import"./Modal.context-CzvA4Cfh.js";import"./Portal-HEz4_Q32.js";import"./useDescendant-yAaYD9qp.js";import"./useClientLayoutEffect-CLUbOuYY.js";import"./DismissableLayer-RlPm4z_T.js";import"./ChevronRight-DNJYjcvy.js";const pt={tags:["autodocs"],component:s},e={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return t.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return t.jsxs(a,{open:m,onOpenChange:p,children:[t.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),t.jsx(a.Content,{children:t.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,e as SomKnapp,pt as default};
