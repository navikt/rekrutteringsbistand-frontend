import{r as i,j as e,e as p}from"./iframe-Cg2fkqe5.js";import{E as s}from"./EndreArkivertStatusModal-DkAsAv6Q.js";import{A as a}from"./ActionMenu-D2N9Iubi.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-5x_YrBgJ.js";import"./OrganisasjonsnummerAlert-BaRgJY_4.js";import"./VStack-CJSEXM8k.js";import"./BasePrimitive-0Im7KAv4.js";import"./List-BG4EAyn1.js";import"./Link-Dr8mKu-k.js";import"./KandidatHendelseTag-BPUe_dLW.js";import"./Tag-y-rJf116.js";import"./FileXMark-BPHK-K8D.js";import"./Trash-DjZhcdM2.js";import"./HandShakeHeart-Kjo7763n.js";import"./Calendar-DqMB72Zp.js";import"./ThumbUp-ChpcBkVQ.js";import"./Table-DXE3mVNz.js";import"./util-BqwlTJMB.js";import"./format-DoEwAlkH.js";import"./match-C9kk39F-.js";import"./parseISO-D9uFhrVJ.js";import"./parse-peL9KPAb.js";import"./getDefaultOptions-DJEvIq0A.js";import"./util-BKrb1-En.js";import"./Modal-B_BZTEM4.js";import"./floating-ui.react-D_si1yYR.js";import"./Date.Input-e0IQy6l9.js";import"./useFormField-ByFVRcLz.js";import"./useControllableState-CwuKQ8Mr.js";import"./ChevronDown-yLvcjboB.js";import"./Modal.context-CyWWEpn_.js";import"./Portal-DNhx24vR.js";import"./useDescendant-CAAHdarD.js";import"./useClientLayoutEffect-B_Yh-X2q.js";import"./DismissableLayer-uEx1HtDr.js";import"./Floating-BXMAhPNs.js";import"./ChevronRight-ZU5KhQtv.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
