import{r as i,j as e,e as l}from"./iframe-DUIlOHDN.js";import{E as s}from"./EndreArkivertStatusModal-bQKni8mJ.js";import{A as a}from"./ActionMenu-CtBmVVGo.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CSTvZGsQ.js";import"./OrganisasjonsnummerAlert-B2Xt21Lw.js";import"./VStack-CP-FOnG8.js";import"./BasePrimitive-KNwMya-W.js";import"./List-yAbYG3Cj.js";import"./Link-CXpb8auh.js";import"./KandidatHendelseTag-DgDOjPoL.js";import"./Tag-BlXO3WSc.js";import"./ChatExclamationmark-Dofq3nTf.js";import"./FileXMark-CtKKNWZ1.js";import"./Trash--ke6aAVh.js";import"./HandShakeHeart-xjJ6R8dj.js";import"./Calendar-KR5O1yQo.js";import"./ThumbUp-BihwvU8r.js";import"./Table-DFVJD2Iv.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BILSI2V5.js";import"./format-CDfDb_lp.js";import"./match-Dp8RA4Ku.js";import"./parseISO-_TwPopcz.js";import"./parse-BGRhHba2.js";import"./getDefaultOptions-DYhQThSW.js";import"./util-kbGLNomq.js";import"./Modal-Bmkz0RZv.js";import"./floating-ui.react-DgvfWY97.js";import"./Date.Input-CLKoA6_E.js";import"./useFormField-hDMR0tco.js";import"./useControllableState-PeOYsQib.js";import"./ChevronDown-Y2lfxo4K.js";import"./Modal.context-Cu402-Eo.js";import"./Portal-C-oWFBZH.js";import"./useDescendant-Cqjw-0eu.js";import"./useClientLayoutEffect-Bhjp9e8S.js";import"./DismissableLayer-DsBtdNSu.js";import"./ChevronRight-CEej6OBo.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
