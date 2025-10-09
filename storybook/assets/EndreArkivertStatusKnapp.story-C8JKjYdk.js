import{r as i,j as t,b as l}from"./iframe-DUxtTNxK.js";import{E as s}from"./EndreArkivertStatusModal-CurRg86P.js";import{A as a}from"./ActionMenu-DvN3YWlm.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-tMH_2NXv.js";import"./OrganisasjonsnummerAlert-Kw2WDzWd.js";import"./VStack-DoqecrzT.js";import"./BasePrimitive-B-03YwKR.js";import"./List-BlNWY6Ar.js";import"./Link-CRlAhKkl.js";import"./KandidatHendelseTag-C7GaS2LG.js";import"./Tag-CGXWCvcz.js";import"./FileXMark-BLSijq_W.js";import"./Trash-DrCBaZmc.js";import"./HandShakeHeart-SYpfDfcJ.js";import"./Calendar-vRZG72bU.js";import"./ThumbUp-D1MY7-bL.js";import"./Table-Cgf_c-8B.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B3kSclT_.js";import"./format-Co7MPrtN.js";import"./startOfDay-lTP3GKUn.js";import"./match-tiuZ8ZDo.js";import"./parseISO-DJIM71K9.js";import"./parse-B-xC80nj.js";import"./getDefaultOptions-QtkovLFY.js";import"./util-DOP1jEkD.js";import"./StillingsContext-DwxaThtx.js";import"./index-BB9gl3jm.js";import"./index-0HEPybu3.js";import"./stillingMock-BrGQ3Dix.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./stilling.dto-Bw9Mbzio.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./SWRLaster-ahx2Fy0D.js";import"./Feilmelding-BvwgHkOs.js";import"./CopyButton-mlBszqul.js";import"./Checkmark-3br_GopI.js";import"./Sidelaster-Cl1Akhnj.js";import"./Modal-DyHa_SWt.js";import"./floating-ui.react-B3fQZbcy.js";import"./Date.Input-Vql_antk.js";import"./useFormField-QnfnlfxN.js";import"./useControllableState-BZbvvCv1.js";import"./ChevronDown-D9_c06q4.js";import"./Modal.context-DCuskc3o.js";import"./Portal-Dg32EfJI.js";import"./useDescendant-CUKpS_dm.js";import"./useClientLayoutEffect-BEQ_m06x.js";import"./DismissableLayer-DmBIwcyl.js";import"./ChevronRight-sQKk5cYq.js";const pt={tags:["autodocs"],component:s},e={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return t.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return t.jsxs(a,{open:m,onOpenChange:p,children:[t.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),t.jsx(a.Content,{children:t.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
