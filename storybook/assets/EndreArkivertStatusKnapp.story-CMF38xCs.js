import{r as i,j as e,d as l}from"./iframe-CiGY7qMR.js";import{E as s}from"./EndreArkivertStatusModal-DguilAo1.js";import{A as a}from"./ActionMenu-D2WhoEv_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqG63GHb.js";import"./OrganisasjonsnummerAlert-ByJga9bj.js";import"./VStack-C_-hnwwm.js";import"./BasePrimitive-BQ62VW93.js";import"./List--wBR2yL0.js";import"./Link-DyRtkKI1.js";import"./KandidatHendelseTag-CcqEyqef.js";import"./Tag-C0efUnwM.js";import"./ChatExclamationmark-Ckn-l4A4.js";import"./FileXMark-BwXFQEJT.js";import"./Trash-digMADAk.js";import"./HandShakeHeart-B7NwZDqt.js";import"./Calendar-TIPtk1kB.js";import"./ThumbUp-X8wLfdad.js";import"./Table-CH84zTQf.js";import"./util-Fn-bZDVZ.js";import"./parse-Dg8aE5G9.js";import"./getDefaultOptions-CiRVjgWb.js";import"./parseISO-9yAsPxsQ.js";import"./index-VhmIyIcn.js";import"./index-B40KJ5b4.js";import"./isBefore-B2vJKrVG.js";import"./util-BAlQu1eo.js";import"./Modal-BqkINsYj.js";import"./floating-ui.react-kQ0dcq0t.js";import"./Date.Input-DpTSAKfW.js";import"./useFormField-C1e6No_-.js";import"./useControllableState-BE8X9NLB.js";import"./ChevronDown-C7Nf2yeE.js";import"./Modal.context-D2yQqxZ7.js";import"./Portal-B36_v9Q7.js";import"./useDescendant-X5nKPTUI.js";import"./useClientLayoutEffect-B5wV4Wz7.js";import"./DismissableLayer-BWiY_6h3.js";import"./Floating-CHAuviCz.js";import"./ChevronRight-D_rYTx2X.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
