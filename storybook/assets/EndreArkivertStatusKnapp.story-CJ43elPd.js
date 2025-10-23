import{r as i,j as e,o as l}from"./iframe-BUTH-F7i.js";import{E as s}from"./EndreArkivertStatusModal-8sT0Ofgk.js";import{A as a}from"./ActionMenu-D4vW3nML.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CCAP6VOk.js";import"./OrganisasjonsnummerAlert-CUE_z-nH.js";import"./VStack-Cfx8ef2d.js";import"./BasePrimitive-EN-WoeUf.js";import"./List-Bm6jGDlf.js";import"./Link-BOqk8eTY.js";import"./KandidatHendelseTag-DfgMw4Jd.js";import"./Tag-DgvxzQaa.js";import"./ChatExclamationmark-DMHFFO4S.js";import"./FileXMark-BK_pna-N.js";import"./Trash-vUHcf7iv.js";import"./HandShakeHeart-BNG4Il0b.js";import"./Calendar-CzmNfA2J.js";import"./ThumbUp-DtK_UsEP.js";import"./Table-vOpy5atD.js";import"./util-BCy7N5Yk.js";import"./format-Crxdz2N3.js";import"./match-uqK75o6n.js";import"./parse-amrLoI_k.js";import"./getDefaultOptions-CvOEeqG0.js";import"./parseISO-CcfrR_FE.js";import"./util-BAjIrB6Q.js";import"./Modal-DDc7-OJ6.js";import"./floating-ui.react-vZDWLZdq.js";import"./Date.Input-WHM_GH4n.js";import"./useFormField-DI3O8FlQ.js";import"./useControllableState-O207w7G8.js";import"./ChevronDown-DEWO2onA.js";import"./Modal.context-Blu6qJf4.js";import"./Portal-BHKSzDqj.js";import"./useDescendant-FlOlaWpg.js";import"./useClientLayoutEffect-Cq-0td_f.js";import"./DismissableLayer-DjbLVHS8.js";import"./Floating-CmTSltbU.js";import"./ChevronRight-MARd6bHq.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
