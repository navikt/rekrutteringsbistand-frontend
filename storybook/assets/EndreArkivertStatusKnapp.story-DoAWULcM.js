import{r as i,j as t,b as l}from"./iframe-WlOW16KT.js";import{E as s}from"./EndreArkivertStatusModal-BDhAHmfk.js";import{A as a}from"./ActionMenu-inF_gkpl.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CONyjdyI.js";import"./OrganisasjonsnummerAlert-YUoWQBHa.js";import"./VStack-DOF5c85d.js";import"./BasePrimitive-D_E869Ly.js";import"./List-DnWEJrOY.js";import"./Link-BMPYEf3M.js";import"./KandidatHendelseTag-Cm8onx4V.js";import"./Tag-CiLo6Qvb.js";import"./FileXMark-DBQzcoy9.js";import"./Trash-DDTWPXzn.js";import"./HandShakeHeart-DjnOpuQw.js";import"./Calendar-Db467AUg.js";import"./ThumbUp-C9qL4nzY.js";import"./Table-B_eAAvaS.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-JGHCy8PM.js";import"./format-lmga2jL-.js";import"./startOfDay-lTP3GKUn.js";import"./match-CItYnUcs.js";import"./parseISO-DJIM71K9.js";import"./parse-DIblDuu1.js";import"./getDefaultOptions-CqbKhm2h.js";import"./util-eRQ1H9rL.js";import"./StillingsContext-BX8ONHb7.js";import"./index-CDp5tk2I.js";import"./index-CibxlY9n.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./stilling.dto-CoZWRjru.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./SWRLaster-BVqtMFKJ.js";import"./Feilmelding-4HUNkcbf.js";import"./CopyButton-BzrJWFs_.js";import"./Checkmark-BzyWZ4Ad.js";import"./Sidelaster-CN63qN-4.js";import"./Modal-qtWpECVq.js";import"./floating-ui.react-DtbDoruD.js";import"./Date.Input-CTWCdr_T.js";import"./useFormField-DD8Yv9fI.js";import"./useControllableState-CCA-pbh4.js";import"./ChevronDown-kr8OAsaw.js";import"./Modal.context-CPaeYima.js";import"./Portal-UpGA7pya.js";import"./useDescendant-Dygdcpjo.js";import"./useClientLayoutEffect-Sgzh84oK.js";import"./DismissableLayer-B2ExQGae.js";import"./ChevronRight-DGPzK6BY.js";const pt={tags:["autodocs"],component:s},e={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return t.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return t.jsxs(a,{open:m,onOpenChange:p,children:[t.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),t.jsx(a.Content,{children:t.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
