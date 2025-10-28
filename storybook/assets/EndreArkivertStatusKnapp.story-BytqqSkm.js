import{r as i,j as e,d as l}from"./iframe-ByzEnOxG.js";import{E as s}from"./EndreArkivertStatusModal-6Pb0tqcg.js";import{A as a}from"./ActionMenu-uaoC65VJ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-32deajk_.js";import"./OrganisasjonsnummerAlert-CjWKWI09.js";import"./VStack-BUNeWq07.js";import"./BasePrimitive-ADC_nWuD.js";import"./List-B9e_Uqcn.js";import"./Link-DP8L-u5t.js";import"./KandidatHendelseTag-DB-zDha5.js";import"./Tag-g1oZ3pmM.js";import"./ChatExclamationmark-CS5U7PlC.js";import"./FileXMark-9GnYKY-v.js";import"./Trash-MmHSDIpY.js";import"./HandShakeHeart-T_GBk1ak.js";import"./Calendar-DEfQx0cd.js";import"./ThumbUp-DIYI02ff.js";import"./Table-hnbPft1Z.js";import"./util-D-V2Ntvq.js";import"./format-jrJ_Xa-f.js";import"./match-C9jzbOjx.js";import"./parse-De4qOPe7.js";import"./getDefaultOptions-BH1O2UCm.js";import"./parseISO-CJWGJaij.js";import"./index-CDMSrJPg.js";import"./index-B40KJ5b4.js";import"./isBefore-DuuV8X7P.js";import"./util-BXsTr_LB.js";import"./Modal-iCCbX0mm.js";import"./floating-ui.react-CIrDHEIY.js";import"./Date.Input-5lHBwM5y.js";import"./useFormField-CJY1G2Gz.js";import"./useControllableState-BF3zxFoJ.js";import"./ChevronDown-BvbvSwjf.js";import"./Modal.context-CpSCLtx0.js";import"./Portal-gRzC06iZ.js";import"./useDescendant-Dpz54Aj9.js";import"./useClientLayoutEffect-6mKBGoH_.js";import"./DismissableLayer-BtNcpslw.js";import"./Floating-B-0Xh_yu.js";import"./ChevronRight-8PuiV_7m.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
