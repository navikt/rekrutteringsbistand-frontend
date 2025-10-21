import{r as i,j as e,e as l}from"./iframe-DbFLZ0zb.js";import{E as s}from"./EndreArkivertStatusModal-C9T0nn0T.js";import{A as a}from"./ActionMenu-B3hXJrpG.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-uirWz_eZ.js";import"./OrganisasjonsnummerAlert-BPfFuRiU.js";import"./VStack-BkCc1yDX.js";import"./BasePrimitive-CgkWumvN.js";import"./List-DI9WFelc.js";import"./Link-BazqRdLB.js";import"./KandidatHendelseTag-DX09_6iy.js";import"./Tag-DvDlcQfM.js";import"./ChatExclamationmark-DMJ-MqzE.js";import"./FileXMark-NauADuuW.js";import"./Trash-D6e790lM.js";import"./HandShakeHeart-Bw2OOiWo.js";import"./Calendar-CwVAoayr.js";import"./ThumbUp-0JCHZIXv.js";import"./Table-CiBbMHtd.js";import"./util-DVzjgWiD.js";import"./format-RWB3csbs.js";import"./match-C1npcLjZ.js";import"./parseISO-D6FxEAUm.js";import"./parse-DZBN-M-U.js";import"./getDefaultOptions-C2XsHj0b.js";import"./util-DXccvi6O.js";import"./Modal-BxOrDhMO.js";import"./floating-ui.react-BsSqsGZq.js";import"./Date.Input-Cr-MtQ8S.js";import"./useFormField-B7aPxswA.js";import"./useControllableState-DCK-IQG-.js";import"./ChevronDown-CSKcdQzq.js";import"./Modal.context-CWMVqGHt.js";import"./Portal-Bzn73xz0.js";import"./useDescendant-DbwemXBE.js";import"./useClientLayoutEffect-Cxo0zxMa.js";import"./DismissableLayer-0bXQ8NiJ.js";import"./Floating-8tOjHLNz.js";import"./ChevronRight-BpEmyo2v.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
