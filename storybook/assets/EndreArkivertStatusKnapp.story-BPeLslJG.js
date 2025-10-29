import{r as i,j as e,d as l}from"./iframe-CWsprw3t.js";import{E as s}from"./EndreArkivertStatusModal-WiRVVv4J.js";import{A as a}from"./ActionMenu-oWq3GCAL.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BerSAD2E.js";import"./OrganisasjonsnummerAlert-DaVaP0-D.js";import"./VStack-B_EWfe-e.js";import"./BasePrimitive-B4YTk1z6.js";import"./List-ysrSRdjS.js";import"./Link-MXhOho_V.js";import"./KandidatHendelseTag-Dw1yPhZQ.js";import"./Tag-CeYYw2Ty.js";import"./ChatExclamationmark-DrWeS80S.js";import"./FileXMark-Ch7vRQFa.js";import"./Trash-C_yphtYR.js";import"./HandShakeHeart-av9NhUeV.js";import"./Calendar-DWLhiUqM.js";import"./ThumbUp-CoFw-Gyw.js";import"./Table-oblJOpGI.js";import"./util-iDo19sf0.js";import"./format-ehOzs_-A.js";import"./match-Dsa18GTe.js";import"./parse-Bjmf4kLR.js";import"./getDefaultOptions-C2tpzm1R.js";import"./parseISO-spBYb4yQ.js";import"./index-Dpcv5ex9.js";import"./index-B40KJ5b4.js";import"./isBefore-Bj1CNU8z.js";import"./util-DYk6qF1n.js";import"./Modal-DpubBxtq.js";import"./floating-ui.react-Ct5t2oiB.js";import"./Date.Input-DUAfTzqL.js";import"./useFormField-zQWLLVsR.js";import"./useControllableState-DMcbZf6j.js";import"./ChevronDown-YzbLBLO9.js";import"./Modal.context-DQJtZMa6.js";import"./Portal-BmS7RfVq.js";import"./useDescendant-DpSCI0s7.js";import"./useClientLayoutEffect-BDsETyEK.js";import"./DismissableLayer-D5Oqwuvl.js";import"./Floating-BVv25HRk.js";import"./ChevronRight-wRxJHKe-.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
