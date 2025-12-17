import{r as s,j as e,d as p}from"./iframe-D4iOfYdD.js";import{E as i}from"./EndreArkivertStatusModal-DYlWX9Hr.js";import{A as a}from"./ActionMenu-BujjFkuk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B_Rd8-tX.js";import"./OrganisasjonsnummerAlert-DtL0m1ZZ.js";import"./VStack-DsoS_FVc.js";import"./BasePrimitive-BL-Ca9OH.js";import"./List-Dp0jtzjl.js";import"./Link-HStznqXy.js";import"./KandidatHendelseTag-BzcUvUh0.js";import"./Tag-gwqLe9qG.js";import"./ChatExclamationmark-CVSqQhUX.js";import"./FileXMark-K-7-BXKI.js";import"./Trash-BiSSnaC_.js";import"./HandShakeHeart-OdReNHn-.js";import"./Calendar-CqdmdWZt.js";import"./ThumbUp--sbuRJQq.js";import"./Table-B_yR3vLO.js";import"./index-BSmOzy6Q.js";import"./index-B40KJ5b4.js";import"./util-BnXACK12.js";import"./Modal-B2ceFw9k.js";import"./floating-ui.react-QxC-zopC.js";import"./Date.Input-B1R4kY_r.js";import"./useFormField-DshCtziE.js";import"./useControllableState-CCn3Haam.js";import"./ChevronDown-DESslXbj.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-5Htf0mWj.js";import"./Modal.context-Cq1NJ1e2.js";import"./Portal-Ct8fySNE.js";import"./useLatestRef-DiUA6Zqh.js";import"./useDescendant-CZhV9_z5.js";import"./DismissableLayer-DZiHPteH.js";import"./Floating-CmfqUZcz.js";import"./ChevronRight-r3A9Ip-5.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
