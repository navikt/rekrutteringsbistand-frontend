import{r as i,j as e,d as l}from"./iframe-Bietwq5R.js";import{E as s}from"./EndreArkivertStatusModal-C8uHZR-o.js";import{A as a}from"./ActionMenu-UfB2st67.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DjQZRqO2.js";import"./OrganisasjonsnummerAlert-DpQq6y7I.js";import"./VStack-sZt5JLr9.js";import"./BasePrimitive-C3DBZZoi.js";import"./List-lSNIRG4U.js";import"./Link-NJnPHS5k.js";import"./KandidatHendelseTag-cRMcFJwi.js";import"./Tag-5glEbiR4.js";import"./ChatExclamationmark-BDwWJbh4.js";import"./FileXMark-BgMiZV8k.js";import"./Trash-BLLOSfsT.js";import"./HandShakeHeart-BnQzUK6M.js";import"./Calendar-D6Qt28Ry.js";import"./ThumbUp-z-Bey4DB.js";import"./Table-Bui68sCT.js";import"./util-DDDrks3n.js";import"./format-CyfInD_Y.js";import"./match-DMb0w9XY.js";import"./parse-Ck-7mst5.js";import"./getDefaultOptions-BEP5j7QA.js";import"./parseISO-j5ExsMzG.js";import"./index-jK4pCKkV.js";import"./index-B40KJ5b4.js";import"./isBefore-BOXOTiO2.js";import"./util-pfPFjztK.js";import"./Modal-BuFLIk4F.js";import"./floating-ui.react-Dg8nhyeA.js";import"./Date.Input-B_Qs2CQc.js";import"./useFormField-DufTyQGE.js";import"./useControllableState-B1O8h9rV.js";import"./ChevronDown-BJ-qVGsw.js";import"./Modal.context-DqcrTTpA.js";import"./Portal-CAW-evOe.js";import"./useDescendant-C6a7rGIS.js";import"./useClientLayoutEffect-RC2vySZb.js";import"./DismissableLayer-BX_he1Z9.js";import"./Floating-Bs-0Un_Q.js";import"./ChevronRight-Cqhzy8AI.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
