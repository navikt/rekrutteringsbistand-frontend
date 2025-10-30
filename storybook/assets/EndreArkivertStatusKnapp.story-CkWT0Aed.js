import{r as i,j as e,d as l}from"./iframe-DenWKEC9.js";import{E as s}from"./EndreArkivertStatusModal-D_-F6eN9.js";import{A as a}from"./ActionMenu-C-ZdGfO9.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CsKBS0BO.js";import"./OrganisasjonsnummerAlert-obK7_QDf.js";import"./VStack-CgG0_7Bf.js";import"./BasePrimitive-CFAu65JT.js";import"./List-kTGH93FM.js";import"./Link-DfNt57rx.js";import"./KandidatHendelseTag-B9pLql8l.js";import"./Tag-mXhf_Gx6.js";import"./ChatExclamationmark-cMbkJjdc.js";import"./FileXMark-Bh_6TLBp.js";import"./Trash-B6zj5MlH.js";import"./HandShakeHeart-CPY-QxOG.js";import"./Calendar-Be4J78HH.js";import"./ThumbUp-ehS7sMwt.js";import"./Table-CiBZ0HtF.js";import"./util-vHg8_hOB.js";import"./parse-DZwGwjot.js";import"./getDefaultOptions-DeORvD4A.js";import"./parseISO-BVrL3Abg.js";import"./index-CFn0OksF.js";import"./index-B40KJ5b4.js";import"./isBefore-BBZToDFP.js";import"./util-BGPb1UJH.js";import"./Modal-TwqKa51N.js";import"./floating-ui.react-C8po_Knd.js";import"./Date.Input-DPKg9Xc0.js";import"./useFormField-CQ6rQeaw.js";import"./useControllableState-DjghFc1P.js";import"./ChevronDown-Db1AikAf.js";import"./Modal.context-Dz6HeStX.js";import"./Portal-BdqQ_UWT.js";import"./useDescendant-B-WMW2Zy.js";import"./useClientLayoutEffect-DBad4hBW.js";import"./DismissableLayer-DZ5QmeOI.js";import"./Floating-Ben9ktU4.js";import"./ChevronRight-90f83Bjx.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
