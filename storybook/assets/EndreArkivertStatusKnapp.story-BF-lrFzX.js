import{r as i,j as e,d as l}from"./iframe-CRS9-BOb.js";import{E as s}from"./EndreArkivertStatusModal-BNZ9q0Zc.js";import{A as a}from"./ActionMenu-n3U-Ribc.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D4h0_DKz.js";import"./OrganisasjonsnummerAlert-Bd5Ejc0y.js";import"./VStack-BQQ0dKEz.js";import"./BasePrimitive-CY8eNV0L.js";import"./List-ihX-omU2.js";import"./Link-BTd5oh5y.js";import"./KandidatHendelseTag-Rh3zxDTn.js";import"./Tag-B2ouINeh.js";import"./ChatExclamationmark-Dml3K2Fe.js";import"./FileXMark-BOLQeMt1.js";import"./Trash-1RhOzARE.js";import"./HandShakeHeart-Do0phbpB.js";import"./Calendar-pLAFrJG6.js";import"./ThumbUp-D44t2_t2.js";import"./Table-DUGu0A95.js";import"./dato-BFDiICoh.js";import"./parse-BtgZcLmZ.js";import"./getDefaultOptions-BkkzbRik.js";import"./parseISO-CHQBiHwP.js";import"./index-D8LHKCF-.js";import"./index-B40KJ5b4.js";import"./util-B_iAsHCp.js";import"./Modal-BI8ix8Oc.js";import"./floating-ui.react-CCOU2mDb.js";import"./Date.Input-Cyj1nMxI.js";import"./useFormField--7ahSM5x.js";import"./useControllableState-CwJC9U2H.js";import"./ChevronDown-1rzHA3pA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DUMsSXDZ.js";import"./Modal.context-CAhttf3V.js";import"./Portal-D7YIbIyr.js";import"./useLatestRef-D_1YJXEW.js";import"./useDescendant-Pfbw50Ko.js";import"./DismissableLayer-jHTTirOe.js";import"./Floating-BMm0KTHU.js";import"./ChevronRight-fVhw3wGd.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
