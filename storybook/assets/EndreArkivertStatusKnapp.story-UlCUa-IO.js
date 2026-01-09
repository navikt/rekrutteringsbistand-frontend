import{r as i,j as e,d as p}from"./iframe-5rwrKWZV.js";import{E as s}from"./EndreArkivertStatusModal-OVcj16ls.js";import{A as a}from"./ActionMenu-CE_ernkT.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8uGXMrm.js";import"./OrganisasjonsnummerAlert-DU2hBNw6.js";import"./VStack-oJzbuFmu.js";import"./BasePrimitive-CL0qHiBR.js";import"./List-DVV_3A1y.js";import"./Link-C6ttPdgA.js";import"./KandidatHendelseTag-wCOqQU_l.js";import"./Tag-D175MPv5.js";import"./ChatExclamationmark-BRtmzK2M.js";import"./FileXMark-Cjvrd1Rm.js";import"./Trash-CO9mAeL6.js";import"./HandShakeHeart-2soFoNDL.js";import"./Calendar-DErdOGUb.js";import"./ThumbUp-D_I-6Tvx.js";import"./ExclamationmarkTriangle-C-veCX7w.js";import"./Table-B5a9LhMk.js";import"./index-OgKCj3ij.js";import"./index-B40KJ5b4.js";import"./util-CkXlrIPZ.js";import"./Modal-Ya9Rotr0.js";import"./floating-ui.react-1FrPqNCb.js";import"./Date.Input-DFNMSpaY.js";import"./useFormField-DL1f3G2z.js";import"./useControllableState-D-uW9VwC.js";import"./ChevronDown-Cf2jlvYQ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DOxN0QLi.js";import"./Modal.context-8SGbIxVb.js";import"./Portal-B_NIOloz.js";import"./useLatestRef-IVNWCuoX.js";import"./useDescendant-DK_E4yia.js";import"./DismissableLayer-BDumuCnE.js";import"./Floating-CQQ7Xyyt.js";import"./ChevronRight-DmEPs3V6.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
