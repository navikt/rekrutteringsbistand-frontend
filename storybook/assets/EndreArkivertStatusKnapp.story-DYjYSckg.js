import{r as i,j as e,d as p}from"./iframe-CRqPxp4c.js";import{E as s}from"./EndreArkivertStatusModal-DAu1JLPm.js";import{A as a}from"./ActionMenu-Cco1PfNn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CVDxtMOc.js";import"./OrganisasjonsnummerAlert-4egePmqO.js";import"./VStack-8laNy6VZ.js";import"./BasePrimitive-DvHygoSy.js";import"./List-YyaVop-Q.js";import"./Link-CAniOPY2.js";import"./KandidatHendelseTag-DT02Bzbe.js";import"./Tag-BFrqR_IL.js";import"./ChatExclamationmark-k3SjiZ8B.js";import"./FileXMark-BsJB8mGI.js";import"./Trash-Dew1RFZr.js";import"./HandShakeHeart-BXBye7V1.js";import"./Calendar-Tt61gXfq.js";import"./ThumbUp-DcV-0-R1.js";import"./ExclamationmarkTriangle-D9ApQaQm.js";import"./Table-BDHm5sZI.js";import"./index-CyJSIw2Q.js";import"./index-B40KJ5b4.js";import"./util-B7_srA5m.js";import"./Modal-DVYTvZJK.js";import"./floating-ui.react-BAFwGOOf.js";import"./Date.Input-Cq3oe4Uu.js";import"./useFormField-DBVEuA_2.js";import"./useControllableState-Ciifist9.js";import"./ChevronDown-BI71OKS5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DeH1onQT.js";import"./Modal.context-hrHc4u5t.js";import"./Portal-DhGxyxcr.js";import"./useLatestRef-CrblMTmW.js";import"./useDescendant-COLayyML.js";import"./DismissableLayer-AMGQ8mwJ.js";import"./Floating-DpnFMEsH.js";import"./ChevronRight-DUWCBnhU.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
