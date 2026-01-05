import{r as i,j as e,d as p}from"./iframe-B2tryd13.js";import{E as s}from"./EndreArkivertStatusModal-BHTtke3z.js";import{A as a}from"./ActionMenu-DCWPAdME.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DT7g8MGk.js";import"./OrganisasjonsnummerAlert-CLtGQX1Q.js";import"./VStack-CpoSlYhk.js";import"./BasePrimitive-Bi6JzUQi.js";import"./List-CYyAh4XV.js";import"./Link-BX-rTweX.js";import"./KandidatHendelseTag-pIWDNAUj.js";import"./Tag-Co9kyAHI.js";import"./ChatExclamationmark-htJQIgl5.js";import"./FileXMark-RNZSYO6O.js";import"./Trash-C5oGf-Fb.js";import"./HandShakeHeart-CEno8NIK.js";import"./Calendar-BaL8G25p.js";import"./ThumbUp-CGTtj9x5.js";import"./ExclamationmarkTriangle-De3rYfmn.js";import"./Table-D51Rf6zr.js";import"./index-D7Wk16A6.js";import"./index-B40KJ5b4.js";import"./util-BbPUv3M_.js";import"./Modal-LawZZxyM.js";import"./floating-ui.react-DSsUI2b0.js";import"./Date.Input-CQ6krd-H.js";import"./useFormField-Br51i2gO.js";import"./useControllableState-C0QJmmOx.js";import"./ChevronDown-By_C_7Bd.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BX_HQuof.js";import"./Modal.context-b7jcTHLm.js";import"./Portal-Ci_5ypcq.js";import"./useLatestRef-0N3qYMzZ.js";import"./useDescendant-2rQY9f6i.js";import"./DismissableLayer-LPannaoJ.js";import"./Floating-Dt1zPpJw.js";import"./ChevronRight-BMzBV01d.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
