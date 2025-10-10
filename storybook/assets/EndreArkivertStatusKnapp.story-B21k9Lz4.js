import{r as i,j as e,d as p}from"./iframe-CW8P7ZDD.js";import{E as s}from"./EndreArkivertStatusModal-r7IOzJzO.js";import{A as a}from"./ActionMenu-CD3v8x3m.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BNt4D00F.js";import"./OrganisasjonsnummerAlert-COtk6STB.js";import"./VStack-C0LveroH.js";import"./BasePrimitive-LrKddP1X.js";import"./List-C5ud_jms.js";import"./Link-CYWdiJz0.js";import"./KandidatHendelseTag-Dv9fdVNj.js";import"./Tag-GPd71jaQ.js";import"./FileXMark-Cxi9OgYo.js";import"./Trash-CTkszNqu.js";import"./HandShakeHeart-D_9gg13F.js";import"./Calendar-Dd214z57.js";import"./ThumbUp-CVcHopFw.js";import"./Table-CDmQ_lSP.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-DuktEjlu.js";import"./format-BGF-tAX-.js";import"./match-Bz7OQ0zI.js";import"./parseISO-CcmPCjvl.js";import"./parse-DnIwr0rg.js";import"./getDefaultOptions-D7nGWO2p.js";import"./util-CK1D1wS9.js";import"./Modal-DsVdsax9.js";import"./floating-ui.react-Dp2W39BI.js";import"./Date.Input-BxC2c25T.js";import"./useFormField-9cHrvR0I.js";import"./useControllableState-lWfKsWES.js";import"./ChevronDown-90OG85yH.js";import"./Modal.context-7M0gvZj4.js";import"./Portal-B3c0viRV.js";import"./useDescendant-BABlK5yx.js";import"./useClientLayoutEffect-CeFXz8eE.js";import"./DismissableLayer-2CrgPHwV.js";import"./ChevronRight-KzTy-Ro7.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
