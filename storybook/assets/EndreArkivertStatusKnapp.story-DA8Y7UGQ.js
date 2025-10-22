import{r as i,j as e,o as p}from"./iframe-BpAMzbpD.js";import{E as s}from"./EndreArkivertStatusModal-uhCWkqzL.js";import{A as a}from"./ActionMenu-DuE0AQsq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CFLN5hQ2.js";import"./OrganisasjonsnummerAlert-DmySheGN.js";import"./VStack-XMCWsZIr.js";import"./BasePrimitive-BP5Ply4H.js";import"./List-CWTwwk6H.js";import"./Link-BASyYMr1.js";import"./KandidatHendelseTag-qTouAMS0.js";import"./Tag-C2U7Qelp.js";import"./FileXMark-Cp8cIU3v.js";import"./Trash-Zelg3jv0.js";import"./HandShakeHeart-Zv71_2yY.js";import"./Calendar-ChH2CqdW.js";import"./ThumbUp-D7UitzWa.js";import"./Table-DydzMjHR.js";import"./util-BAhXs1Zv.js";import"./format-CERjb80Z.js";import"./match-wsBYmfrA.js";import"./parse-DrdAJy4P.js";import"./getDefaultOptions-YPBy5iMj.js";import"./parseISO-DP54w3ag.js";import"./util-CXMN-qRW.js";import"./Modal-D5fekCo_.js";import"./floating-ui.react-BVqJumW4.js";import"./Date.Input--12ODzPC.js";import"./useFormField-CN_2X3Ux.js";import"./useControllableState-KMcY1F_r.js";import"./ChevronDown-TAdbvDWv.js";import"./Modal.context-B5dNLjIw.js";import"./Portal-kQMBLjyC.js";import"./useDescendant-D-X4lvXf.js";import"./useClientLayoutEffect-TNcmly1U.js";import"./DismissableLayer-66eKhA68.js";import"./Floating-BinQJgzr.js";import"./ChevronRight-aG9ZLZVp.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
