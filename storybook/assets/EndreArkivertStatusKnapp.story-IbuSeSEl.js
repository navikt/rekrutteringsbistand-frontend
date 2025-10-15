import{r as i,j as e,e as l}from"./iframe-2oXcNiqk.js";import{E as s}from"./EndreArkivertStatusModal-B6_pfT2B.js";import{A as a}from"./ActionMenu-yUzGrVMW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-9cw44CFx.js";import"./OrganisasjonsnummerAlert-Co5iX4pO.js";import"./VStack-BUstKu9N.js";import"./BasePrimitive-D35wACDJ.js";import"./List-NYF0RnVw.js";import"./Link-DL5GC8Kj.js";import"./KandidatHendelseTag-DK-cwbPx.js";import"./Tag-B42hqPtf.js";import"./ChatExclamationmark-D2kVWZgc.js";import"./FileXMark-Cx8wRif0.js";import"./Trash-BPy2QyW5.js";import"./HandShakeHeart-C7XDbjKV.js";import"./Calendar-DCiz2ZNN.js";import"./ThumbUp-HVgTX8jg.js";import"./Table-Ci_5s20-.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CnlfkwHW.js";import"./format-DWR74HJu.js";import"./match-BjocQXBS.js";import"./parseISO-CK2-VrtQ.js";import"./parse-CySyyd9K.js";import"./getDefaultOptions-DQBqaWPU.js";import"./util-utnAozoB.js";import"./Modal-pL3N-R8J.js";import"./floating-ui.react-DF0Q9kmB.js";import"./Date.Input-Bqt9RLEn.js";import"./useFormField-CJzQfYGu.js";import"./useControllableState-n5Q65I8H.js";import"./ChevronDown-D00_874Q.js";import"./Modal.context-ZJRuN0us.js";import"./Portal-DfAvPQD4.js";import"./useDescendant-q-9CiBNR.js";import"./useClientLayoutEffect-C5HQygpY.js";import"./DismissableLayer-CCbDkFeX.js";import"./ChevronRight-DrKehBpV.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
