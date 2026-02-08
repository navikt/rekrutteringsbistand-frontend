import{r as i,j as e,d as l}from"./iframe-YHW4kXZv.js";import{E as s}from"./EndreArkivertStatusModal-DlKm0Kgh.js";import{A as a}from"./ActionMenu-D2whky1H.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BvkxYlct.js";import"./OrganisasjonsnummerAlert-DV8gw3L3.js";import"./VStack-Dp5vHBfm.js";import"./BasePrimitive-C-ojZHC8.js";import"./Box-1ghu6X00.js";import"./List-CQBFO1Og.js";import"./Link-DlrFKguL.js";import"./KandidatHendelseTag-LcSqDNI6.js";import"./Tag-BAyHvYyb.js";import"./ChatExclamationmark-DIOXg4cS.js";import"./FileXMark-CBMm6RAT.js";import"./Trash-D6xaqT6E.js";import"./HandShakeHeart-CqGmJPyT.js";import"./Calendar-CtAhEP7Z.js";import"./ThumbUp-DwgYdscX.js";import"./ExclamationmarkTriangle-DMpQqrc7.js";import"./Table-DDuqGOmb.js";import"./index-7WDwZ5Wk.js";import"./index-B40KJ5b4.js";import"./util-BiAbxkke.js";import"./Modal-eLu0JNFL.js";import"./floating-ui.react-Db5h8fgu.js";import"./useFormField-10iWKxpF.js";import"./ReadMore-CX7iw8aC.js";import"./useControllableState-DBDJpPfm.js";import"./ChevronDown-qlCMax07.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BQ4GNSxx.js";import"./Modal.context-C4wiLZa4.js";import"./Portal-DuaLV0Vg.js";import"./useValueAsRef-ugXEHbCx.js";import"./Floating-DPEaRSF2.js";import"./useDescendant-D5VXQPx1.js";import"./DismissableLayer-BjppdLKT.js";import"./ChevronRight-DYzbbEFv.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
