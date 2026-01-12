import{r as i,j as e,d as p}from"./iframe-CQil8Ac-.js";import{E as s}from"./EndreArkivertStatusModal-DYgcizvS.js";import{A as a}from"./ActionMenu-_OhdxHqw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SkgljsBN.js";import"./OrganisasjonsnummerAlert-odXmaA76.js";import"./VStack-ClTC7-Qh.js";import"./BasePrimitive-DbEo0fjm.js";import"./List-CkRxobO3.js";import"./Link-D4LnQKIk.js";import"./KandidatHendelseTag-CCi1oh8O.js";import"./Tag-Bas5e0Nb.js";import"./ChatExclamationmark-BeuekrfM.js";import"./FileXMark-3YevlryT.js";import"./Trash-DzjGyRR4.js";import"./HandShakeHeart-CjMF1Meo.js";import"./Calendar-DjNLQ5xy.js";import"./ThumbUp-DvNucyaU.js";import"./ExclamationmarkTriangle-CZa1nyJG.js";import"./Table-DerwyLaa.js";import"./index-CAf5FEcx.js";import"./index-B40KJ5b4.js";import"./util-DvpZv3Av.js";import"./Modal-CJG4OmxT.js";import"./floating-ui.react-ByckfoFE.js";import"./Date.Input-FBhanq2N.js";import"./useFormField-CwsHIkrX.js";import"./useControllableState-DoktTe-G.js";import"./ChevronDown-BQMQJvkf.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-kHAbcb-S.js";import"./Modal.context-C0GzMoCc.js";import"./Portal-BJtXxp4G.js";import"./useLatestRef-BqQYaUi9.js";import"./useDescendant-BiTU3FpN.js";import"./DismissableLayer-DBjrKVPw.js";import"./Floating-xvuhhN4t.js";import"./ChevronRight-DM9SXbMg.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
