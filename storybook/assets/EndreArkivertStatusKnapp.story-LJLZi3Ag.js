import{r as i,j as e,d as l}from"./iframe-D2Aj6zCc.js";import{E as s}from"./EndreArkivertStatusModal-seDytG08.js";import{A as a}from"./ActionMenu-DeHKYnTn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CVo3Jh_C.js";import"./OrganisasjonsnummerAlert-DtVWcYdv.js";import"./VStack-C0px-8ON.js";import"./BasePrimitive-CZCCzmpl.js";import"./List-C17jiTC3.js";import"./Link-BbRR72Sv.js";import"./KandidatHendelseTag-BOKN8pZD.js";import"./Tag-BU7LP8ol.js";import"./ChatExclamationmark-BzDF83HB.js";import"./FileXMark-D5IziqHB.js";import"./Trash-C9VAgQTp.js";import"./HandShakeHeart-CuGj1GWQ.js";import"./Calendar-BN12mNGQ.js";import"./ThumbUp-4qBtJy8A.js";import"./Table-DP4ODOfN.js";import"./util-B3R4WQ-U.js";import"./format-D5lxIe5p.js";import"./match-kaY1zcGg.js";import"./parse-slG2HzgA.js";import"./getDefaultOptions-PtjhHLpX.js";import"./parseISO-DD7vKl-q.js";import"./index-DKGEBeCX.js";import"./index-B40KJ5b4.js";import"./isBefore-Db0eRYon.js";import"./util-CMYs9b3j.js";import"./Modal-BEt4rWb7.js";import"./floating-ui.react-C0SACjvL.js";import"./Date.Input-_LQLW8wr.js";import"./ReadOnlyIcon-P8HRj0bA.js";import"./useFormField-DclvFkpD.js";import"./useControllableState-Bhz5eiw1.js";import"./ChevronDown-DjuBD2or.js";import"./Modal.context-DAf4bnRZ.js";import"./Portal-DRXTOwzF.js";import"./useDescendant-DFZv9C6i.js";import"./useClientLayoutEffect-CijJ4uQ4.js";import"./DismissableLayer-CcNaITY2.js";import"./Floating-CeiNznGs.js";import"./ChevronRight-BX2CxrmU.js";const ee={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,ee as default};
