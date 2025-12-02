import{r as s,j as e,d as p}from"./iframe-DaMpkblx.js";import{E as i}from"./EndreArkivertStatusModal-B69O5HIl.js";import{A as a}from"./ActionMenu-DD3F1B-s.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Cwcc7zFz.js";import"./OrganisasjonsnummerAlert-h-Di_bNM.js";import"./VStack-23sbLoSw.js";import"./BasePrimitive-CYVGx-uf.js";import"./List-aHBIqAbu.js";import"./Link-Wnvzg6Lp.js";import"./KandidatHendelseTag-SkJw_-Yj.js";import"./Tag-CwJ_OZcS.js";import"./ChatExclamationmark-CPpKFWD2.js";import"./FileXMark-Deto5TrM.js";import"./Trash-Br2F0rQ_.js";import"./HandShakeHeart-BvglSkIT.js";import"./Calendar-kUt3L55e.js";import"./ThumbUp-k0kpUnCx.js";import"./Table-DrZhGpfX.js";import"./index-D1bdHCqu.js";import"./index-B40KJ5b4.js";import"./util-BqxU6O_y.js";import"./Modal-Bk1drFoQ.js";import"./floating-ui.react-4kzvOiiR.js";import"./Date.Input-DsCO5uBT.js";import"./useFormField-D0gNNOjh.js";import"./useControllableState-Dli3H_H5.js";import"./ChevronDown-RtuA7GZk.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C28Y73Kt.js";import"./Modal.context-B1rC-gT8.js";import"./Portal-BGTIfVfF.js";import"./useLatestRef-C3Ad1k7t.js";import"./useDescendant-CR3GhaRx.js";import"./DismissableLayer-ByifLX4b.js";import"./Floating-xDYhT9VC.js";import"./ChevronRight-CiRgRSjl.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
