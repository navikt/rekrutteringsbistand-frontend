import{r as i,j as e,d as l}from"./iframe-DGJZfRLj.js";import{E as s}from"./EndreArkivertStatusModal-Sn1g1Jeh.js";import{A as a}from"./ActionMenu-6sBw9Wov.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-QeYeky1X.js";import"./OrganisasjonsnummerAlert-CT28ABKE.js";import"./VStack--kEYkFg6.js";import"./BasePrimitive-Cf43sxsL.js";import"./List-1YVdWu8v.js";import"./Link-DVpjbSpT.js";import"./KandidatHendelseTag-D37_OMzx.js";import"./Tag-CtkeTXXx.js";import"./ChatExclamationmark-Dq2jWQU4.js";import"./FileXMark-wIy8EfzN.js";import"./Trash-U-agCtJj.js";import"./HandShakeHeart-IbTz3SXE.js";import"./Calendar-CQjYGR9z.js";import"./ThumbUp-D2ZhMt21.js";import"./Table-w6_jwB_N.js";import"./util-l964Anfk.js";import"./format-DIeaPe2D.js";import"./match-BV0xT-Zd.js";import"./parse-CicZeTJW.js";import"./getDefaultOptions-CDcTPqZg.js";import"./parseISO-CJfUdAZG.js";import"./util-RQAia1fF.js";import"./Modal-Dm6USPJW.js";import"./floating-ui.react-BBlmzmSN.js";import"./Date.Input-BtSzc9Ln.js";import"./useFormField-lXpThh9F.js";import"./useControllableState-V_CYkDBC.js";import"./ChevronDown-qHXczOAY.js";import"./Modal.context-DMB1oKZj.js";import"./Portal-BNwPUP_W.js";import"./useDescendant-D-o2dfrc.js";import"./useClientLayoutEffect-D8AEg2Kf.js";import"./DismissableLayer-BBi3BOGD.js";import"./Floating-J8PYjrsx.js";import"./ChevronRight-DNfVh4gM.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
