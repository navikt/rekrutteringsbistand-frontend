import{r as i,j as t,b as l}from"./iframe--aQMagBM.js";import{E as s}from"./EndreArkivertStatusModal-B0KZvziK.js";import{A as a}from"./ActionMenu-uEgaUYom.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-fubJ-EHq.js";import"./OrganisasjonsnummerAlert-Dd25ZFhX.js";import"./VStack-CcHbObW-.js";import"./BasePrimitive-CgaIh8hS.js";import"./List-3rCESo3E.js";import"./Link-BOoQ8up8.js";import"./KandidatHendelseTag-D1ik4fHf.js";import"./Tag-58wlhy8F.js";import"./FileXMark-BqGqkZBh.js";import"./Trash-BqYkRCE7.js";import"./HandShakeHeart-Blgv2ubq.js";import"./Calendar-B-VLWjRU.js";import"./ThumbUp-CTaI1ELg.js";import"./Table-CZNZ724A.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-DSiroPk9.js";import"./format-MMJ3lUv3.js";import"./startOfDay-lTP3GKUn.js";import"./match-D3KjDt9e.js";import"./parseISO-DJIM71K9.js";import"./parse-BHaxN4X0.js";import"./getDefaultOptions-DQ6qo6CG.js";import"./util-BWsvCRGZ.js";import"./StillingsContext-DZ7500xJ.js";import"./index-DGK8N2bN.js";import"./index-KIHPoeBY.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./stilling.dto-Bhwqemp5.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./SWRLaster-CS2y56Xc.js";import"./Feilmelding-DYjOJh_0.js";import"./CopyButton-DSQ0Lkk7.js";import"./Checkmark-2R3Z9HaV.js";import"./Sidelaster-D7OjQVf3.js";import"./Modal-B9efuJdm.js";import"./floating-ui.react-BUPDCv_K.js";import"./Date.Input-DqDzn--5.js";import"./useFormField-BSpkEy74.js";import"./useControllableState-DPhX6gr7.js";import"./ChevronDown-BMr9GbQT.js";import"./Modal.context-CkHckn2m.js";import"./Portal-Ck0_ZFFQ.js";import"./useDescendant-Df1-a3qX.js";import"./useClientLayoutEffect-Cz08r_d0.js";import"./DismissableLayer-BOzBDZfL.js";import"./ChevronRight-D4OLK907.js";const pt={tags:["autodocs"],component:s},e={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return t.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return t.jsxs(a,{open:m,onOpenChange:p,children:[t.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),t.jsx(a.Content,{children:t.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
