import{r as i,j as e,d as p}from"./iframe-CV73DyWa.js";import{E as s}from"./EndreArkivertStatusModal-DgNBCYP6.js";import{A as a}from"./ActionMenu-BooKheMM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CjNOdAMg.js";import"./OrganisasjonsnummerAlert-DjE0GWHo.js";import"./VStack-cEHi9SUW.js";import"./BasePrimitive-B_De4CAh.js";import"./List-HnOz_kCx.js";import"./Link-57MGbgPS.js";import"./KandidatHendelseTag-DaWCieF5.js";import"./Tag-Dd3cMFTB.js";import"./ChatExclamationmark-BBPsMkee.js";import"./FileXMark-CgD9lN1y.js";import"./Trash--Kaxf-qN.js";import"./HandShakeHeart-C1iR4CaW.js";import"./Calendar-CapMgFXy.js";import"./ThumbUp-BSLXHmhe.js";import"./ExclamationmarkTriangle-BwwKE67-.js";import"./Table-B8F7NOQx.js";import"./index-DH0maD0N.js";import"./index-B40KJ5b4.js";import"./util-4kSLp8PR.js";import"./Modal-CoJQlk_0.js";import"./floating-ui.react--4vdpoxG.js";import"./Date.Input-BqYKtR5d.js";import"./useFormField-ApOpuFuN.js";import"./useControllableState-C-h5BLq2.js";import"./ChevronDown-QpvSSQJL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-f8TwtSD1.js";import"./Modal.context-duSZOSEU.js";import"./Portal-Dd0bHwsI.js";import"./useLatestRef-DNsMjuQD.js";import"./useDescendant-DR0wZKwi.js";import"./DismissableLayer-Dluz05na.js";import"./Floating-DPHZPLza.js";import"./ChevronRight-qlalWkfV.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
