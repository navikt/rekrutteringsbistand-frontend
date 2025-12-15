import{r as s,j as e,d as p}from"./iframe-Dp6nHdOg.js";import{E as i}from"./EndreArkivertStatusModal-C4JVheMx.js";import{A as a}from"./ActionMenu-BL45Y7dj.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DCEF9UD9.js";import"./OrganisasjonsnummerAlert-CuEWXB_R.js";import"./VStack-C5sZiGcO.js";import"./BasePrimitive-DXQCNI91.js";import"./List-BNJVmnt7.js";import"./Link-l82fbgQu.js";import"./KandidatHendelseTag-BQSUv-pa.js";import"./Tag-CV7NXTin.js";import"./ChatExclamationmark-CtBwm2Fa.js";import"./FileXMark-DT-X0bwF.js";import"./Trash-Y6EFmEhJ.js";import"./HandShakeHeart-CrIT-FAb.js";import"./Calendar-L7c72Jnf.js";import"./ThumbUp-C-mqTuPv.js";import"./Table-CXDsAoNd.js";import"./index-CO49fOIc.js";import"./index-B40KJ5b4.js";import"./util-0VcbYtNN.js";import"./Modal-okqWqShm.js";import"./floating-ui.react-BGp16BDI.js";import"./Date.Input--SdJUnDs.js";import"./useFormField-TwllRpup.js";import"./useControllableState-Cfuho32D.js";import"./ChevronDown-BrwQWDe4.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-O96VxCt4.js";import"./Modal.context-n3x3Fqud.js";import"./Portal-D3vJuV3P.js";import"./useLatestRef-8ydpUS_x.js";import"./useDescendant-CihCDKtv.js";import"./DismissableLayer-Dt4vpDcl.js";import"./Floating-Z8anwbmH.js";import"./ChevronRight-CxdLNC6W.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
