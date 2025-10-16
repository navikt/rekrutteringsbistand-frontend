import{r as i,j as e,e as p}from"./iframe-BHAALu18.js";import{E as s}from"./EndreArkivertStatusModal-BRREKjw5.js";import{A as a}from"./ActionMenu-CXTr0MRG.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfN5An09.js";import"./OrganisasjonsnummerAlert-BHvMlvj7.js";import"./VStack-Cq88-JDT.js";import"./BasePrimitive-DTksipQc.js";import"./List-BaN9HM07.js";import"./Link-H1I1_-EK.js";import"./KandidatHendelseTag-B4LO3XvZ.js";import"./Tag-CjIXk9UC.js";import"./FileXMark-CMmv0rBH.js";import"./Trash-TgRDHxl5.js";import"./HandShakeHeart-RWCGHmFB.js";import"./Calendar-Dxp2Sh-4.js";import"./ThumbUp-Bhk68IRC.js";import"./Table-nIodCrv-.js";import"./util-CtYvtQR3.js";import"./format-CcnEZL49.js";import"./match-UbcUMXBF.js";import"./parseISO-DhIi_C9M.js";import"./parse-Qbbomewj.js";import"./getDefaultOptions-CJC3hBp3.js";import"./util-BwpY6r-m.js";import"./Modal-CsKfTbyc.js";import"./floating-ui.react-BlUAEfg5.js";import"./Date.Input-BS8RN3Cy.js";import"./useFormField-D8u6Al33.js";import"./useControllableState-DvMFbOQQ.js";import"./ChevronDown-6zNJcWbQ.js";import"./Modal.context-CPyqR72d.js";import"./Portal-9BsBigvd.js";import"./useDescendant-DXO6KeRV.js";import"./useClientLayoutEffect-DEuAlZZ5.js";import"./DismissableLayer-be7a08mI.js";import"./Floating-DjyHzdN5.js";import"./ChevronRight-CdoewiD4.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
