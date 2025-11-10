import{r as i,j as e,d as l}from"./iframe-CXuq1bzX.js";import{E as s}from"./EndreArkivertStatusModal-1ZIIDBHr.js";import{A as a}from"./ActionMenu-CDmb9SsF.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bx-AetdE.js";import"./OrganisasjonsnummerAlert-CY5A3vjK.js";import"./VStack-LqEsNTZZ.js";import"./BasePrimitive-DiKxr93y.js";import"./List-kturX9gN.js";import"./Link-7owy6tIO.js";import"./KandidatHendelseTag-DXzu7t6G.js";import"./Tag-Cida-Jzl.js";import"./ChatExclamationmark-CuSvMEE0.js";import"./FileXMark-C3mt0mpx.js";import"./Trash-DX_gXo3G.js";import"./HandShakeHeart-5A69Ghj1.js";import"./Calendar-BY4BLq7b.js";import"./ThumbUp-CflO1XuR.js";import"./Table-DY0KpqSI.js";import"./util-gTmey5Qo.js";import"./parse-DbkuHRKQ.js";import"./getDefaultOptions-DWOdFO_w.js";import"./parseISO-C2WOoNR9.js";import"./index-BQoksTIl.js";import"./index-B40KJ5b4.js";import"./isBefore-VEfq4mHQ.js";import"./util-yzhPM8cu.js";import"./Modal-f3KIdpQl.js";import"./floating-ui.react-CdZLdAlr.js";import"./Date.Input-Dr8BqPTN.js";import"./useFormField-C5bcbRvk.js";import"./useControllableState-Bofen_tQ.js";import"./ChevronDown-DqTWyvcU.js";import"./Modal.context-g98g4FZE.js";import"./Portal-DVaHiMzT.js";import"./useDescendant-waL9R7tb.js";import"./useClientLayoutEffect-DN-HA8Cw.js";import"./DismissableLayer-vULnLQXj.js";import"./Floating-CGW242n5.js";import"./ChevronRight-CbTACQ1z.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
