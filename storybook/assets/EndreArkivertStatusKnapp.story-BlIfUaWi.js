import{r as i,j as e,o as l}from"./iframe-DhZ6odjH.js";import{E as s}from"./EndreArkivertStatusModal-CwCiblXi.js";import{A as a}from"./ActionMenu-vRnjwh2L.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D3Dve5TB.js";import"./OrganisasjonsnummerAlert-BviJ9JMB.js";import"./VStack-BFpIlLyU.js";import"./BasePrimitive-Ofhb2EAm.js";import"./List-Csjqadvv.js";import"./Link-CVCEyY32.js";import"./KandidatHendelseTag-ClNTVVbc.js";import"./Tag-IvE1ESiI.js";import"./ChatExclamationmark-C52cVVmC.js";import"./FileXMark-DJPd0cfS.js";import"./Trash-Bj6CoTrm.js";import"./HandShakeHeart-DQxJHZuq.js";import"./Calendar-NqVtKBdr.js";import"./ThumbUp-zSm5etw3.js";import"./Table-BNblVnDj.js";import"./util-TPcHwbXL.js";import"./format-CSQizK5m.js";import"./match-BcagkmTM.js";import"./parse-DcPhISwL.js";import"./getDefaultOptions-jSIKK2Ms.js";import"./parseISO-VKa_XIl-.js";import"./isBefore-DPyoQYA2.js";import"./util-DPdujr1q.js";import"./Modal-qpf7Y554.js";import"./floating-ui.react-7udJG8Yp.js";import"./Date.Input-CNpZwMN3.js";import"./useFormField-Bdv40VSQ.js";import"./useControllableState-XxOyj5-F.js";import"./ChevronDown-BQcdOcKV.js";import"./Modal.context--Sc1y3le.js";import"./Portal-B4A5WcvW.js";import"./useDescendant-BuZfSEYa.js";import"./useClientLayoutEffect-BEniKjNU.js";import"./DismissableLayer-C_voP-Bm.js";import"./Floating-pVApUBMN.js";import"./ChevronRight-ZWLZ7Pgd.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
