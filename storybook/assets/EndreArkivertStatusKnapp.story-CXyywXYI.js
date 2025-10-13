import{r as i,j as e,e as l}from"./iframe-Cj10hJN9.js";import{E as s}from"./EndreArkivertStatusModal-9E84jBNw.js";import{A as a}from"./ActionMenu-n0RngZgU.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DCcLHUx1.js";import"./OrganisasjonsnummerAlert-C5fz9_EJ.js";import"./VStack-DgWskb_V.js";import"./BasePrimitive-C6TPMJG9.js";import"./List-iw2586sG.js";import"./Link-4Kimjj0w.js";import"./KandidatHendelseTag-BljSSKGz.js";import"./Tag-NFCzJApn.js";import"./FileXMark-Du0-y8iF.js";import"./Trash-C2Lk7IOj.js";import"./HandShakeHeart-DkAoXuKv.js";import"./Calendar-LzYd0bSO.js";import"./ThumbUp-B1ZOElQa.js";import"./Table-BAMcB-vd.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Dqlyw5_B.js";import"./format-BpNq2Jet.js";import"./match-B8Nx5_0z.js";import"./parseISO-Bc0AvIe9.js";import"./parse-BQHX6S4p.js";import"./getDefaultOptions-B8TMiTK_.js";import"./util-BgzDEogq.js";import"./Modal-BnX-hhmJ.js";import"./floating-ui.react-S9Semehl.js";import"./Date.Input-DQpYWw0X.js";import"./useFormField-DDhd-sru.js";import"./useControllableState-Cfdz1RLo.js";import"./ChevronDown-BGcv_Viz.js";import"./Modal.context-C6cKfwqx.js";import"./Portal-CRcm6ui9.js";import"./useDescendant-B0pom2ql.js";import"./useClientLayoutEffect-CPejujR3.js";import"./DismissableLayer-CkNNSdhu.js";import"./Floating-Dz0_zC7R.js";import"./ChevronRight-B8b64JtU.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
