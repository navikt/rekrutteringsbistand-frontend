import{r as i,j as e,d as l}from"./iframe-aLQ-e9Bs.js";import{E as s}from"./EndreArkivertStatusModal-B0WQE6Gh.js";import{A as a}from"./ActionMenu-9YfhadPd.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-n7fWOt1w.js";import"./OrganisasjonsnummerAlert-CMKyOgZS.js";import"./VStack-B_NMgWl2.js";import"./BasePrimitive-DgQ0muEM.js";import"./List--FbSpWGF.js";import"./Link-C7TG3Wbo.js";import"./KandidatHendelseTag-Bhlx4A7s.js";import"./Tag-BSiLor6A.js";import"./ChatExclamationmark-BpCuBXwx.js";import"./FileXMark-fdPIH0gM.js";import"./Trash-CE3GJCl1.js";import"./HandShakeHeart-Bmmk-Kl2.js";import"./Calendar-yUYAdLGF.js";import"./ThumbUp-BevLsdBM.js";import"./Table-Dh8r2BxK.js";import"./util-DmiB4DbH.js";import"./format-DRoHYGaf.js";import"./match-DKTEQDYa.js";import"./parse-CmNi_03g.js";import"./getDefaultOptions-Cq9nUZhj.js";import"./parseISO-DveLVf6B.js";import"./index-BfZzGsIa.js";import"./index-B40KJ5b4.js";import"./isBefore-CNJ43cBE.js";import"./util-BEZIGxgn.js";import"./Modal-7xxDdg-K.js";import"./floating-ui.react-aWiTZIT7.js";import"./Date.Input-CuKmVmUv.js";import"./useFormField-Cl-fyKfU.js";import"./useControllableState-D6h_Nb38.js";import"./ChevronDown-CSinFy1h.js";import"./Modal.context-61ODrapt.js";import"./Portal-DIJDLH7D.js";import"./useDescendant-Dfnj1lAO.js";import"./useClientLayoutEffect-FMHHNWN1.js";import"./DismissableLayer-DKbepy-Q.js";import"./Floating-DfdJkiPL.js";import"./ChevronRight-BS2f13St.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
