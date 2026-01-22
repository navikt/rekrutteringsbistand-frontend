import{r as i,j as e,d as l}from"./iframe-CAw-ouFU.js";import{E as s}from"./EndreArkivertStatusModal-BcSYFVS9.js";import{A as a}from"./ActionMenu-Drd5s0jP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DZbPDdFr.js";import"./OrganisasjonsnummerAlert-BTVHVsk8.js";import"./VStack-DmbzPDu2.js";import"./BasePrimitive-DNA_EDjk.js";import"./Box-Dv8Q1uI1.js";import"./List-D-26_DGq.js";import"./Link-nyMi0yzP.js";import"./KandidatHendelseTag-DHT8L6b1.js";import"./Tag-KYDN1iTd.js";import"./ChatExclamationmark-5ROYrAqU.js";import"./FileXMark-DXGCpJdw.js";import"./Trash-BJD9PGNe.js";import"./HandShakeHeart-CJySRICZ.js";import"./Calendar-CxHTABhI.js";import"./ThumbUp-Bo3XgmzN.js";import"./ExclamationmarkTriangle-BN2M502l.js";import"./Table-Bq_P-05h.js";import"./index-Bj4NLN9P.js";import"./index-B40KJ5b4.js";import"./util-Bj1y6LrW.js";import"./Modal-Bfo0SBIi.js";import"./floating-ui.react-DNmGgPj-.js";import"./useFormField-DEADPuFr.js";import"./ReadMore-CIAtE5ac.js";import"./useControllableState-BkJ0YlGV.js";import"./ChevronDown-CeYxn9vA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D6WqdrFI.js";import"./Modal.context-CwD_lHOd.js";import"./Portal-CeqU7nZP.js";import"./useValueAsRef-B-4EPICH.js";import"./Floating-Dq_vswri.js";import"./useDescendant-BFS4G8mj.js";import"./DismissableLayer-DqRfWjts.js";import"./ChevronRight-4JfF_wiD.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
