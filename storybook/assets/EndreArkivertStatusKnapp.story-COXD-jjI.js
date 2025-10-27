import{r as i,j as e,o as l}from"./iframe-BI-wOhDW.js";import{E as s}from"./EndreArkivertStatusModal-ClUpbmEH.js";import{A as a}from"./ActionMenu-AlP6N95S.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DKa98RjW.js";import"./OrganisasjonsnummerAlert-DvIP9YpF.js";import"./VStack-5t71I81C.js";import"./BasePrimitive-CyEUpN4A.js";import"./List-DaEFvDd0.js";import"./Link-CbybqPuY.js";import"./KandidatHendelseTag-LdG59OF-.js";import"./Tag-CoYdrjhu.js";import"./ChatExclamationmark-1aiRWdvi.js";import"./FileXMark-7SYvXUvm.js";import"./Trash-BWVielyQ.js";import"./HandShakeHeart-C6sS2LfC.js";import"./Calendar-DoXIVeT3.js";import"./ThumbUp-BBWDCzSk.js";import"./Table-DBzuuHb3.js";import"./util-VPWGOupN.js";import"./format-C4wZl0k7.js";import"./match-CxVFVvJa.js";import"./parse-DT2NsE4V.js";import"./getDefaultOptions-DlIahH4Y.js";import"./parseISO-C8NqvTw9.js";import"./index-CM80Zpw7.js";import"./index-B40KJ5b4.js";import"./isBefore-C7-6PEcE.js";import"./util-BbhlvIaM.js";import"./Modal-DpxmUOHV.js";import"./floating-ui.react-CgJwLGYV.js";import"./Date.Input-DYRBxtfE.js";import"./useFormField-B53o4-NQ.js";import"./useControllableState-Buz9rD4N.js";import"./ChevronDown-DnpdpR7X.js";import"./Modal.context-BomWj9n6.js";import"./Portal-BJVU-f0N.js";import"./useDescendant-vN9lMEgX.js";import"./useClientLayoutEffect-DuSL_6x7.js";import"./DismissableLayer-D2T5B0pj.js";import"./Floating-ZhAJ63iw.js";import"./ChevronRight-5QxKcjfR.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
