import{r as i,j as e,d as l}from"./iframe-BvvhrRbe.js";import{E as s}from"./EndreArkivertStatusModal-CRKIF0Q8.js";import{A as a}from"./ActionMenu-DcF8HEzL.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BQlVPf0v.js";import"./OrganisasjonsnummerAlert-BwxqIh6L.js";import"./VStack-H-QHo1Lk.js";import"./BasePrimitive-D8FPQ7k9.js";import"./List-Cn_jzuTP.js";import"./Link-CsrhpwZn.js";import"./KandidatHendelseTag-uqkaD8lH.js";import"./Tag-SkBtSqZW.js";import"./ChatExclamationmark-Ci-T-MCf.js";import"./FileXMark-CnCHTgdq.js";import"./Trash-BFc3IcOH.js";import"./HandShakeHeart-CkRPZYE4.js";import"./Calendar-B6MdUGZp.js";import"./ThumbUp-CwHeVLTC.js";import"./Table-BM4dW861.js";import"./util-n1hQ2AEe.js";import"./parse-D8BXf2p8.js";import"./getDefaultOptions-Dik-T2FL.js";import"./parseISO-C5Lmk-lV.js";import"./index-DvcJyemQ.js";import"./index-B40KJ5b4.js";import"./isBefore-COw2UKUc.js";import"./util-IxlLFe_4.js";import"./Modal-ezHDj648.js";import"./floating-ui.react-BfNC0LZR.js";import"./Date.Input-DBxx4b9_.js";import"./useFormField-C83omxTl.js";import"./useControllableState-B5f92340.js";import"./ChevronDown-C6Y4QFb6.js";import"./Modal.context-BcwzVHgg.js";import"./Portal-C4Zfnjpp.js";import"./useDescendant-y-KejPye.js";import"./useClientLayoutEffect-KrIuP9uz.js";import"./DismissableLayer-DHzi24Js.js";import"./Floating-BVdV2l6X.js";import"./ChevronRight-BP12pIbF.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
