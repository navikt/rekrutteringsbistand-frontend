import{r as i,j as e,d as l}from"./iframe-C0RnufXY.js";import{E as s}from"./EndreArkivertStatusModal-Bw4Y3B73.js";import{A as a}from"./ActionMenu-Cn0yMx-j.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-wB6bumNi.js";import"./OrganisasjonsnummerAlert-BCxdIMXO.js";import"./VStack-BCxO0S0u.js";import"./BasePrimitive-BpW17Mon.js";import"./Box-vRWMR1wU.js";import"./List-DRDq3cqn.js";import"./Link-Byz21SDj.js";import"./KandidatHendelseTag-BBnI298W.js";import"./Tag-DRzUowny.js";import"./ChatExclamationmark-2nn0xS5c.js";import"./FileXMark-BosuBZnb.js";import"./Trash-CjDRZ1Gk.js";import"./HandShakeHeart-GRgLuVNm.js";import"./Calendar-6loLCvZB.js";import"./ThumbUp-C6OwJlt6.js";import"./ExclamationmarkTriangle-QPfihTJi.js";import"./Table-CAsc9rbz.js";import"./index-ieblspgF.js";import"./index-B40KJ5b4.js";import"./util-Of1ExplY.js";import"./Modal-6e7DLqgD.js";import"./floating-ui.react-CGo4gJhe.js";import"./useFormField-D3T80Yr7.js";import"./ReadMore-eKuiDr1Z.js";import"./useControllableState-lgVaH3ap.js";import"./ChevronDown-DY2xCSpH.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C6JTGAWP.js";import"./Modal.context-wSuQQ2Dw.js";import"./Portal-MeogIUJJ.js";import"./useValueAsRef-DqwR6BTd.js";import"./Floating-D6hXdyd7.js";import"./useDescendant-DYtEJ0pI.js";import"./DismissableLayer-CJroQpy8.js";import"./ChevronRight---XS1I21.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
