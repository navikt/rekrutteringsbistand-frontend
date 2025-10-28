import{r as i,j as e,d as l}from"./iframe-Dc4kNGne.js";import{E as s}from"./EndreArkivertStatusModal-4tIHGmEI.js";import{A as a}from"./ActionMenu-Z9efkhej.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BD9hT32I.js";import"./OrganisasjonsnummerAlert-BdUwOAPw.js";import"./VStack-CAyaVyw0.js";import"./BasePrimitive-D4zqyJIf.js";import"./List-Dyxs_JCW.js";import"./Link-C_rbyaAd.js";import"./KandidatHendelseTag-PnBwwGp6.js";import"./Tag-B8f9oEtQ.js";import"./ChatExclamationmark-CAfBq3z7.js";import"./FileXMark-DqPsfHxv.js";import"./Trash-CcVYippy.js";import"./HandShakeHeart-3qVuOYbM.js";import"./Calendar-BPwIt6xQ.js";import"./ThumbUp-DVMCkmxK.js";import"./Table-DICHcfDi.js";import"./util-DybQ6GFM.js";import"./format-Dy54t0JC.js";import"./match-DW3BXZFb.js";import"./parse-BVEnNKgt.js";import"./getDefaultOptions-B3ByGOpu.js";import"./parseISO-CGoO-hx7.js";import"./index-B0NViYym.js";import"./index-B40KJ5b4.js";import"./isBefore-1PECHI9n.js";import"./util-CR9k7jeF.js";import"./Modal-CqqD7Geb.js";import"./floating-ui.react-yYtpfu_G.js";import"./Date.Input-BWsdgrzB.js";import"./useFormField-HIpxu0nw.js";import"./useControllableState-idObFdbI.js";import"./ChevronDown-DN-Romwj.js";import"./Modal.context-D4sW2lKa.js";import"./Portal-Bce5BjZH.js";import"./useDescendant-CMJ867Hz.js";import"./useClientLayoutEffect-CxfS0aD3.js";import"./DismissableLayer-Bvg8CO6L.js";import"./Floating-7QApcGEt.js";import"./ChevronRight-e3i8gGA4.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
