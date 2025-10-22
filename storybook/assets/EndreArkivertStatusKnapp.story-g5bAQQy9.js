import{r as i,j as e,o as l}from"./iframe-Dq6jy88q.js";import{E as s}from"./EndreArkivertStatusModal-Drfa2mNA.js";import{A as a}from"./ActionMenu-fiewR653.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-MDe7Sd4b.js";import"./OrganisasjonsnummerAlert-BmxlHndD.js";import"./VStack-C46EolpT.js";import"./BasePrimitive-AJE0S9yC.js";import"./List-BgSmaTYP.js";import"./Link-CiqLb_Ad.js";import"./KandidatHendelseTag-BjLzDDH1.js";import"./Tag-CjGfYI92.js";import"./ChatExclamationmark-Bjm8btDi.js";import"./FileXMark-CZma65Q0.js";import"./Trash-B-m4QklR.js";import"./HandShakeHeart-rn4U49DR.js";import"./Calendar-D6vFvXVm.js";import"./ThumbUp-C_D_koxN.js";import"./Table-CWHU9ppE.js";import"./util-D11TBdcN.js";import"./format-CCxjOKSg.js";import"./match-CHiwlmDn.js";import"./parse-DqZhlknj.js";import"./getDefaultOptions-CXgSi_fi.js";import"./parseISO-BwWUFruW.js";import"./util-ChoCMt5m.js";import"./Modal-DlzX8ssa.js";import"./floating-ui.react-SIvQ9HNW.js";import"./Date.Input-DEyz2K7-.js";import"./useFormField-o2AGkmWd.js";import"./useControllableState-4r1Xb4L0.js";import"./ChevronDown-B7HWF0M3.js";import"./Modal.context-D8H8I5WA.js";import"./Portal-DnaUSPgr.js";import"./useDescendant-BiWoxJFE.js";import"./useClientLayoutEffect-Cbcy2dkk.js";import"./DismissableLayer-DkdFaEZu.js";import"./Floating-D0amKZWq.js";import"./ChevronRight-COBhwJbM.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
