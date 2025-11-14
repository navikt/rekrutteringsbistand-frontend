import{r as i,j as e,d as l}from"./iframe-B4tn9iAN.js";import{E as s}from"./EndreArkivertStatusModal-CMhk4V90.js";import{A as a}from"./ActionMenu-B9p5Zxyl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BfzvtQ6n.js";import"./OrganisasjonsnummerAlert-BSDE_l1X.js";import"./VStack-MIN_AJvI.js";import"./BasePrimitive-7zT0f-d9.js";import"./List-Bom0P9CA.js";import"./Link-CjNaC0Mm.js";import"./KandidatHendelseTag-CtnPwZg2.js";import"./Tag-CM4YJnHT.js";import"./ChatExclamationmark-CwcVnQEA.js";import"./FileXMark-BuZwU9yz.js";import"./Trash-CwDSnh0J.js";import"./HandShakeHeart-DUvF352I.js";import"./Calendar-CsFSA24o.js";import"./ThumbUp-CwjBLOrD.js";import"./Table-DwR1QuxA.js";import"./util-USYhdgOo.js";import"./parse-D9DFnrdL.js";import"./getDefaultOptions-LHoMVmWr.js";import"./parseISO-ClbEW8sT.js";import"./index-CNWXVBIo.js";import"./index-B40KJ5b4.js";import"./isBefore-BQtY6-NU.js";import"./util-B2JlJp7q.js";import"./Modal-DezPqazB.js";import"./floating-ui.react-DOp8LaL5.js";import"./Date.Input-C1ug36yG.js";import"./useFormField-aLRNU1Ej.js";import"./useControllableState-D36QMu8J.js";import"./ChevronDown-CBGI7YRG.js";import"./Modal.context-B90kyfFI.js";import"./Portal-Dh55U1eE.js";import"./useDescendant-BJvN3fUf.js";import"./useClientLayoutEffect-BIyNbf0Y.js";import"./DismissableLayer-YTWsz1Ro.js";import"./Floating-D6Hld4O_.js";import"./ChevronRight-VYJboyld.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
