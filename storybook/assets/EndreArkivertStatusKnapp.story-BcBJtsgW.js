import{r as i,j as e,d as p}from"./iframe-BYISswbs.js";import{E as s}from"./EndreArkivertStatusModal-3rRa7qf5.js";import{A as a}from"./ActionMenu-BNw_GnQz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BaZtCo5m.js";import"./OrganisasjonsnummerAlert-CqzePRBy.js";import"./VStack-CFJ3tPOL.js";import"./BasePrimitive-CtkwkOJy.js";import"./List-BzdgGNSZ.js";import"./Link-CbujZ1sb.js";import"./KandidatHendelseTag-nra8tFi-.js";import"./Tag-D22eWKzC.js";import"./ChatExclamationmark-DFvXRn5F.js";import"./FileXMark-B5wZpbyl.js";import"./Trash-9nM6IHnp.js";import"./HandShakeHeart-DPnFj-9F.js";import"./Calendar-d4CBC7_P.js";import"./ThumbUp-DlM8UKEn.js";import"./ExclamationmarkTriangle-DszJHhmG.js";import"./Table-4YP9nRVg.js";import"./index-BEl2lAyJ.js";import"./index-B40KJ5b4.js";import"./util-BeZJZ_MM.js";import"./Modal-BXSPKmam.js";import"./floating-ui.react-DcW5Mqvr.js";import"./Date.Input-DsBuwcal.js";import"./useFormField-XJ0gedfQ.js";import"./useControllableState-C4jTtRT3.js";import"./ChevronDown-Cu0PDR1P.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CKwr79zC.js";import"./Modal.context-B2PCIQn6.js";import"./Portal-BT31vNAb.js";import"./useLatestRef-CppwV8Wq.js";import"./useDescendant-DPrzCESf.js";import"./DismissableLayer-C7ReiRv2.js";import"./Floating-GtWw2cOB.js";import"./ChevronRight-0EDVfC77.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
