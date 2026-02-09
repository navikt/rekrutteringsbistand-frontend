import{r as i,j as e,d as l}from"./iframe-SGs9n5AY.js";import{E as s}from"./EndreArkivertStatusModal-xsx8gn-0.js";import{A as a}from"./ActionMenu-D4KiZ2BO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CSR3K4NQ.js";import"./OrganisasjonsnummerAlert-CCXd5l36.js";import"./VStack-DVblRpQg.js";import"./BasePrimitive-DhMYuIXn.js";import"./Box-Cbnrm5kp.js";import"./List-z0o5hgu8.js";import"./Link-BN-rLTot.js";import"./KandidatHendelseTag-lnlzUuNp.js";import"./Tag-d0gHNfmq.js";import"./ChatExclamationmark-BqsYhffn.js";import"./FileXMark-D89fD8rJ.js";import"./Trash-BHgd6Yc7.js";import"./HandShakeHeart-DIjNO2Ne.js";import"./Calendar-BwVmCUoI.js";import"./ThumbUp-G0OPQQAC.js";import"./ExclamationmarkTriangle-Cj_6dZL1.js";import"./Table-BhNtlHIL.js";import"./index-CbUQqlOu.js";import"./index-B40KJ5b4.js";import"./util-Ae9jxT6g.js";import"./Modal-Cpk95CYw.js";import"./floating-ui.react-_myRbqhk.js";import"./useFormField-BhN1Jddn.js";import"./ReadMore-CX_u8uTc.js";import"./useControllableState-B3K6rjpl.js";import"./ChevronDown-B7kNYBc6.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B_bLdoEO.js";import"./Modal.context-BKWfvGQj.js";import"./Portal-DK1RB1pW.js";import"./useValueAsRef-CTyKq8r-.js";import"./Floating-CZpSQI3O.js";import"./useDescendant-C5FaV9Ln.js";import"./DismissableLayer-qvel5ih6.js";import"./ChevronRight-BZDSz-Eu.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
