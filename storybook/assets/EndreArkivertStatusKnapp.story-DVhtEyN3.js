import{r as i,j as e,e as l}from"./iframe-Ejs43Sks.js";import{E as s}from"./EndreArkivertStatusModal-CD4aBprJ.js";import{A as a}from"./ActionMenu-CZi8kKqA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BjpbXg5q.js";import"./OrganisasjonsnummerAlert-fjDuoqIW.js";import"./VStack-CchjVpJ5.js";import"./BasePrimitive-BxpluNwg.js";import"./List-Her9o2HL.js";import"./Link-C9NCChkG.js";import"./KandidatHendelseTag-DiwijmOF.js";import"./Tag-TP6QH-jh.js";import"./FileXMark-DChOUZ4n.js";import"./Trash-Bm0dsz2Z.js";import"./HandShakeHeart-CGufr3rg.js";import"./Calendar-CsD0Nk9_.js";import"./ThumbUp-CUoVvEhw.js";import"./Table-BqaDFad4.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BQ3vDkfm.js";import"./format-BimL1EHc.js";import"./match-LE9LHLKw.js";import"./parseISO-DHy74_RK.js";import"./parse-COTUoLn0.js";import"./getDefaultOptions-B-7UKY3W.js";import"./util-DHJPPEgd.js";import"./Modal-BP64UtCa.js";import"./floating-ui.react-BwRoqLYP.js";import"./Date.Input-CsFsJtM3.js";import"./useFormField-BMJXgtxV.js";import"./useControllableState-CSEGMF6f.js";import"./ChevronDown-no_Jq8A9.js";import"./Modal.context-DQr9EoQJ.js";import"./Portal-BDp1vaYq.js";import"./useDescendant-B3NcaYHB.js";import"./useClientLayoutEffect-CeU_aQpQ.js";import"./DismissableLayer-DNIg-w_5.js";import"./Floating-Cy4-q4HL.js";import"./ChevronRight-Dwyre9Ff.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
