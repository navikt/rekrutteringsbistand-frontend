import{r as i,j as e,d as l}from"./iframe-Dc0o8n1N.js";import{E as s}from"./EndreArkivertStatusModal-CgOrVJYp.js";import{A as a}from"./ActionMenu-DdfJ2IBi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BmgJ4OH_.js";import"./OrganisasjonsnummerAlert-CqZxctra.js";import"./VStack-C9L46_VK.js";import"./BasePrimitive-Dmb6kQD-.js";import"./List-jKdfhMM1.js";import"./Link-Btc_Gnct.js";import"./KandidatHendelseTag-a3V7u5VB.js";import"./Tag-AkL8D5A1.js";import"./ChatExclamationmark-JIPFnqqP.js";import"./FileXMark-BTey7NHE.js";import"./Trash-DO5ng2Yk.js";import"./HandShakeHeart-42WG9tcO.js";import"./Calendar-UTK99kHI.js";import"./ThumbUp-CsszLo0o.js";import"./Table-VQ-DE8Om.js";import"./util-DoXsPMYu.js";import"./parse-C0GdbZBL.js";import"./getDefaultOptions-VI3jz9kh.js";import"./parseISO-iTHWhyQw.js";import"./index-BYAn7sa8.js";import"./index-B40KJ5b4.js";import"./isBefore-DB59kyBO.js";import"./util-54MHG8lP.js";import"./Modal-2hSbZbj0.js";import"./floating-ui.react-BRJoX_3W.js";import"./Date.Input-CTYgFq-P.js";import"./useFormField-v17k0j8g.js";import"./useControllableState-Bks-1kQU.js";import"./ChevronDown-tMowo8ra.js";import"./Modal.context-BU9LkM9K.js";import"./Portal-BPk8IsHP.js";import"./useDescendant-D2hOP2-w.js";import"./useClientLayoutEffect-BxfSOdln.js";import"./DismissableLayer-D95--5DY.js";import"./Floating-Dq186IMT.js";import"./ChevronRight-Efl1TrI1.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
