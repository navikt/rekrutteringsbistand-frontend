import{r as i,j as e,d as p}from"./iframe-CZslivju.js";import{E as s}from"./EndreArkivertStatusModal-BwCwiR6t.js";import{A as a}from"./ActionMenu-Bw127i64.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgD67gQc.js";import"./OrganisasjonsnummerAlert-CD_DayHm.js";import"./VStack-DUBo_edV.js";import"./BasePrimitive-DUfdo9kL.js";import"./List-D7ixjuyg.js";import"./Link-D8FWDtoI.js";import"./KandidatHendelseTag-BySAcDuD.js";import"./Tag-Dfqld2iL.js";import"./FileXMark-XX9tD0kF.js";import"./Trash-MyCCBKoW.js";import"./HandShakeHeart-CiRqeagj.js";import"./Calendar-DiwF2yQv.js";import"./ThumbUp-DGjIwcjH.js";import"./Table-Jk6u2ME4.js";import"./util-IQ18lRMy.js";import"./format-DMpFMWtq.js";import"./match-BT5f6T_9.js";import"./parse-Ct7n3oJ2.js";import"./getDefaultOptions-CtUMiAib.js";import"./parseISO-B7rV6_4O.js";import"./util-axHo5kBG.js";import"./Modal-CUJSlshC.js";import"./floating-ui.react-DbYvyV8k.js";import"./Date.Input-B88OqUWr.js";import"./useFormField-DlnxwSY_.js";import"./useControllableState-jtcIfYop.js";import"./ChevronDown-DG95zFN3.js";import"./Modal.context-BtgAVPDG.js";import"./Portal-CR1UprYb.js";import"./useDescendant-DPxUZxmL.js";import"./useClientLayoutEffect-BvAbSuti.js";import"./DismissableLayer-DJKCG9h_.js";import"./Floating-BJoM3w9u.js";import"./ChevronRight-IqKkbhGw.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
