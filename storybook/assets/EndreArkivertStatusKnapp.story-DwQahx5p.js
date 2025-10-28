import{r as i,j as e,d as l}from"./iframe-D1P1_UW8.js";import{E as s}from"./EndreArkivertStatusModal-CCOKdFfo.js";import{A as a}from"./ActionMenu-DdqNlJFp.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C1pWQErK.js";import"./OrganisasjonsnummerAlert-DaW1RgFU.js";import"./VStack-DnXFRTfB.js";import"./BasePrimitive-DQPxH2SA.js";import"./List-C6rND9OD.js";import"./Link-DGeWC8PI.js";import"./KandidatHendelseTag-Gcto27zC.js";import"./Tag-BF0fVLzi.js";import"./ChatExclamationmark-NDb_v3yu.js";import"./FileXMark-DUHFId3R.js";import"./Trash-CcKvLfxV.js";import"./HandShakeHeart-BO6Hx1to.js";import"./Calendar-CUklSc48.js";import"./ThumbUp-BaU7Vlly.js";import"./Table-Btjy1hoN.js";import"./util-ClOszpdN.js";import"./format-lAfslPga.js";import"./match-C328oq0P.js";import"./parse-C8R03IWs.js";import"./getDefaultOptions-D8Wf4dlj.js";import"./parseISO-AXk05REW.js";import"./index-Dj3qVHhP.js";import"./index-B40KJ5b4.js";import"./isBefore-Dt5OoaD5.js";import"./util-LqgaeGCQ.js";import"./Modal-CIBZOMiW.js";import"./floating-ui.react-NqINbjK8.js";import"./Date.Input-9SqZ1cqs.js";import"./useFormField-DQ2U86-F.js";import"./useControllableState-BihhkRmU.js";import"./ChevronDown-DrvMofhM.js";import"./Modal.context-wTC2bp0_.js";import"./Portal-BY7AdNQA.js";import"./useDescendant-C4of8rWj.js";import"./useClientLayoutEffect-D6BRyFP4.js";import"./DismissableLayer-HBItTf3b.js";import"./Floating-B22JeQUP.js";import"./ChevronRight-BT9KCkdS.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
