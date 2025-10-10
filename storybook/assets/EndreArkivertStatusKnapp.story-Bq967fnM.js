import{r as i,j as t,b as l}from"./iframe-CHkTVuiI.js";import{E as s}from"./EndreArkivertStatusModal-CigOFUaR.js";import{A as a}from"./ActionMenu-D29Tq3M8.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-SOk_um48.js";import"./OrganisasjonsnummerAlert-DUcHHBz-.js";import"./VStack-M98BC8vl.js";import"./BasePrimitive-DioXofnN.js";import"./List-VkKHJD8N.js";import"./Link-CkfGG5-p.js";import"./KandidatHendelseTag-BiX-vV5K.js";import"./Tag-CCAWPPV3.js";import"./FileXMark-f5rkYKOY.js";import"./Trash-DFUkDF32.js";import"./HandShakeHeart-e31V6fSB.js";import"./Calendar-XriZ9M4u.js";import"./ThumbUp-DwHzK9pn.js";import"./Table-DR-zuF53.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B4fxBsP7.js";import"./format-CiL1qK_N.js";import"./startOfDay-lTP3GKUn.js";import"./match-Cit0idUw.js";import"./parseISO-DJIM71K9.js";import"./parse-CabpiR_f.js";import"./getDefaultOptions-CKIF9KYI.js";import"./util-CPu6-ApK.js";import"./StillingsContext-BqLSlB_O.js";import"./index-BvQF28vZ.js";import"./index-BR16nd7K.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./stilling.dto--v9AHxlS.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./SWRLaster-177d91rz.js";import"./Feilmelding-DgHAx26V.js";import"./CopyButton-CS4PChRX.js";import"./Checkmark-PV8AZsuh.js";import"./Sidelaster-KVwuK41U.js";import"./Modal-DJnHWKKy.js";import"./floating-ui.react-B8XfV_lm.js";import"./Date.Input-BR2zdpiX.js";import"./useFormField-D38t1t5q.js";import"./useControllableState-R0yyGfAK.js";import"./ChevronDown-BGLJuQ6d.js";import"./Modal.context-B54ogbif.js";import"./Portal-DhAO95xy.js";import"./useDescendant-BzIJZVOm.js";import"./useClientLayoutEffect-Dno45Y9E.js";import"./DismissableLayer-DYYB3_kD.js";import"./ChevronRight-38MHbWoj.js";const pt={tags:["autodocs"],component:s},e={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return t.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return t.jsxs(a,{open:m,onOpenChange:p,children:[t.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),t.jsx(a.Content,{children:t.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
