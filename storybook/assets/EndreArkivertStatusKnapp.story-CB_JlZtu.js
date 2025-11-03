import{r as i,j as e,d as l}from"./iframe-B_4Bmvgq.js";import{E as s}from"./EndreArkivertStatusModal-ugHN6c7X.js";import{A as a}from"./ActionMenu-BHu3fBDn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-i_nfhuWU.js";import"./OrganisasjonsnummerAlert-CqgMt66G.js";import"./VStack-CfKwjGy1.js";import"./BasePrimitive-DQobvrvZ.js";import"./List-CzLJLjt6.js";import"./Link-BpNm44et.js";import"./KandidatHendelseTag-DytQV4w5.js";import"./Tag-De8rW7_j.js";import"./ChatExclamationmark-BbG6xmDN.js";import"./FileXMark-D6H9E5OH.js";import"./Trash-BLDYiN1k.js";import"./HandShakeHeart-B3JBqYbB.js";import"./Calendar-CNvG0z3N.js";import"./ThumbUp-cNmdmnjm.js";import"./Table-Bt8oMTeV.js";import"./util-DxRjoqmU.js";import"./parse-BWK0vuo5.js";import"./getDefaultOptions-zcAWsOsE.js";import"./parseISO-D8xjauEE.js";import"./index-kl9f-6X3.js";import"./index-B40KJ5b4.js";import"./isBefore-BimlqcNR.js";import"./util-DbDFcdAO.js";import"./Modal-BTkKakWf.js";import"./floating-ui.react-DvaqMJwp.js";import"./Date.Input-BzmHLEDM.js";import"./useFormField-6IqjGViV.js";import"./useControllableState-W5agygci.js";import"./ChevronDown-iJetkpSI.js";import"./Modal.context-BqzOV7AP.js";import"./Portal-Bx_Rqpua.js";import"./useDescendant-BRdXeAaX.js";import"./useClientLayoutEffect-BYRGBLGK.js";import"./DismissableLayer-TDH-sgIn.js";import"./Floating-B6cWDOVf.js";import"./ChevronRight-B2DUC9st.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
