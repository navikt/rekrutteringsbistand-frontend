import{r as i,j as e,d as l}from"./iframe-gH94vgHb.js";import{E as s}from"./EndreArkivertStatusModal-DninnWRK.js";import{A as a}from"./ActionMenu-BDITa5HU.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8KLeJ3I.js";import"./OrganisasjonsnummerAlert-MH_cCrA5.js";import"./VStack-C_0uRaza.js";import"./BasePrimitive-Dtl2AadN.js";import"./List-BtqrrQcv.js";import"./Link-p2HB9IqL.js";import"./KandidatHendelseTag-BCqxey7V.js";import"./Tag-CDQnKGRM.js";import"./ChatExclamationmark-DGwLxcg6.js";import"./FileXMark-Ci6usYat.js";import"./Trash-qgo9htqB.js";import"./HandShakeHeart-D3Rlz-cl.js";import"./Calendar-Bnmy4T63.js";import"./ThumbUp-BTvWXjct.js";import"./Table-BG9kKsFy.js";import"./util-B7KpV28B.js";import"./parse-CdFgNFjr.js";import"./getDefaultOptions-CGpM4vju.js";import"./parseISO-Mr5NIIp7.js";import"./index-CDjreHOH.js";import"./index-B40KJ5b4.js";import"./isBefore-FTsTdB_z.js";import"./util-gQjNrG7y.js";import"./Modal-C4g0aqfs.js";import"./floating-ui.react-lzNEJOuU.js";import"./Date.Input-B_gIJoTa.js";import"./useFormField-D561gDES.js";import"./useControllableState-Cinq0aNa.js";import"./ChevronDown-7VBKiPJA.js";import"./Modal.context-DTyg-fOh.js";import"./Portal-R8KtFtQN.js";import"./useDescendant-Bw-HNl2x.js";import"./useClientLayoutEffect-D_LjXigV.js";import"./DismissableLayer-0An5LHn5.js";import"./Floating-wtKuSQeG.js";import"./ChevronRight-nY3MUGyJ.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
