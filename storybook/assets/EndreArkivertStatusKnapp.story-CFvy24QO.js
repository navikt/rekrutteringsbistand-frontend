import{r as i,j as e,d as l}from"./iframe-KUKdFIZ7.js";import{E as s}from"./EndreArkivertStatusModal-C46l7B3J.js";import{A as a}from"./ActionMenu-D6pjcTLK.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D2FlhmQq.js";import"./OrganisasjonsnummerAlert-Cens1SaX.js";import"./VStack-mK9hJiTW.js";import"./BasePrimitive-CwMHyULp.js";import"./List-CxhB9m56.js";import"./Link-C-73sY9C.js";import"./KandidatHendelseTag-BSBnY5VX.js";import"./Tag-CueplUnS.js";import"./ChatExclamationmark-CDGYDuI2.js";import"./FileXMark-BBZ5pBIr.js";import"./Trash-BdahZicB.js";import"./HandShakeHeart-B8vXQM1-.js";import"./Calendar-DZiE5oJM.js";import"./ThumbUp-zUFk_W2S.js";import"./Table-CnaaXedP.js";import"./util-CUS-DV8a.js";import"./parse-DYiz1_ue.js";import"./getDefaultOptions-5m5FAbyc.js";import"./parseISO-CfRniNou.js";import"./index-BufEp5AN.js";import"./index-B40KJ5b4.js";import"./isBefore-Dd8Tg51N.js";import"./util-fOgXZ26Y.js";import"./Modal-CYGYMkjr.js";import"./floating-ui.react-Chb98_y2.js";import"./Date.Input-CW2er8ey.js";import"./useFormField-BTKzMuXa.js";import"./useControllableState-B4PYToqo.js";import"./ChevronDown-Dt5oLEcE.js";import"./Modal.context-B64mO1CY.js";import"./Portal-Du4L2QaB.js";import"./useDescendant-DtlgqquC.js";import"./useClientLayoutEffect-Wu0zOuyx.js";import"./DismissableLayer-BXivA_65.js";import"./Floating-V7EXYud4.js";import"./ChevronRight-CFQxBWoL.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
