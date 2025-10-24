import{r as i,j as e,o as l}from"./iframe-CvAsB_PP.js";import{E as s}from"./EndreArkivertStatusModal-D6ub_V5X.js";import{A as a}from"./ActionMenu-o3krbH-h.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DHEfE7VN.js";import"./OrganisasjonsnummerAlert-DWhn1SoA.js";import"./VStack-AxHc-0un.js";import"./BasePrimitive-77yr22IN.js";import"./List-DGM51Xar.js";import"./Link-D4f6l7hj.js";import"./KandidatHendelseTag-DJk4h79r.js";import"./Tag-BlcEA2XO.js";import"./ChatExclamationmark-U-mAqd6d.js";import"./FileXMark-BvZo3mlC.js";import"./Trash-DE-JZ4Of.js";import"./HandShakeHeart-CfWBIzRT.js";import"./Calendar-AGKkvLA3.js";import"./ThumbUp-BoD78Ibw.js";import"./Table-KjrGy8Rv.js";import"./util-BHiovH0e.js";import"./format-sZiXwGYw.js";import"./match-C6g0stLX.js";import"./parse-nHoLI9xT.js";import"./getDefaultOptions-G1ntk7f0.js";import"./parseISO-B2cUmngl.js";import"./index-CmwULg7v.js";import"./index-B40KJ5b4.js";import"./isBefore-DF09tqDQ.js";import"./util-B6ET-IeG.js";import"./Modal-LeLMqzzP.js";import"./floating-ui.react-BpGFA9Kj.js";import"./Date.Input-Cuo6jDtV.js";import"./useFormField-C4h_Ry35.js";import"./useControllableState-CXrdSXg2.js";import"./ChevronDown-xfR_zGFT.js";import"./Modal.context-Btg_hFAx.js";import"./Portal-BFUrlxOA.js";import"./useDescendant-D3xT3_3v.js";import"./useClientLayoutEffect-DViUq2IM.js";import"./DismissableLayer-CUhhFJsj.js";import"./Floating-fWiVt9O6.js";import"./ChevronRight-J4RTndj9.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
