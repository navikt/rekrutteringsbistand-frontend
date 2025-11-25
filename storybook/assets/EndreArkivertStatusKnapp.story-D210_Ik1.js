import{r as s,j as e,d as p}from"./iframe-jqaI6nix.js";import{E as i}from"./EndreArkivertStatusModal-CMFCS8OZ.js";import{A as a}from"./ActionMenu-D8swpOxt.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C649bL-T.js";import"./OrganisasjonsnummerAlert-JWpvu6Qz.js";import"./VStack-DkixGE9B.js";import"./BasePrimitive-CuHGsCuA.js";import"./List-sTPOW_96.js";import"./Link-B0wBbhpE.js";import"./KandidatHendelseTag-Dth3ETUV.js";import"./Tag-Dxz2F1X3.js";import"./ChatExclamationmark-5qgcDlon.js";import"./FileXMark-D6NBLjbP.js";import"./Trash-CjU-_2dx.js";import"./HandShakeHeart-4SmutWG-.js";import"./Calendar-Duf0ayvC.js";import"./ThumbUp-Vbg7evja.js";import"./Table-CuOaNzwY.js";import"./index-D54ImCzq.js";import"./index-B40KJ5b4.js";import"./util-CNc4M1gg.js";import"./Modal-B-RDzvQt.js";import"./floating-ui.react-B79GNVCi.js";import"./Date.Input-Dx7G7IQt.js";import"./useFormField-C6_IMCya.js";import"./useControllableState-CB7qy0JV.js";import"./ChevronDown-Cjik6YhF.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D3StlOby.js";import"./Modal.context-DOBq2N_q.js";import"./Portal-Bum2g8F2.js";import"./useLatestRef-yLZ39Zv7.js";import"./useDescendant-DhhFvIMf.js";import"./DismissableLayer-C4GOVWmh.js";import"./Floating-FLC1K9nu.js";import"./ChevronRight-CpyDrmEI.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
