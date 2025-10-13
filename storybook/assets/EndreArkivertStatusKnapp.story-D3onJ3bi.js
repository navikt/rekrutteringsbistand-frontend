import{r as i,j as e,e as p}from"./iframe-DTHA2nxD.js";import{E as s}from"./EndreArkivertStatusModal-lDqESHG9.js";import{A as a}from"./ActionMenu-DhC-inwd.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAboKifI.js";import"./OrganisasjonsnummerAlert-BVVLJQbe.js";import"./VStack-BuSfiGmL.js";import"./BasePrimitive-27uWw9nl.js";import"./List-B0tDBA85.js";import"./Link-Cnn3O-42.js";import"./KandidatHendelseTag-NyFSbea_.js";import"./Tag-BpBnduOF.js";import"./FileXMark-ohwLyZXm.js";import"./Trash-BkGVVOvI.js";import"./HandShakeHeart-B5iBofOb.js";import"./Calendar-DjNHtV_N.js";import"./ThumbUp-DhTEf4Mz.js";import"./Table-CXJIpCsj.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Bee2RjYD.js";import"./format-DHJbBaGr.js";import"./match-FN6Ws5zG.js";import"./parseISO-itZVSozC.js";import"./parse-C__7ktr7.js";import"./getDefaultOptions-BGp9H_mJ.js";import"./util-DX5gj5C0.js";import"./Modal-Ds-AniFV.js";import"./floating-ui.react-lLWQ_lhn.js";import"./Date.Input-Cr4fsRHX.js";import"./useFormField-DRV6dlvA.js";import"./useControllableState-D9O5mgzD.js";import"./ChevronDown-ItR2lOu8.js";import"./Modal.context-Ckallw7p.js";import"./Portal-BuKJVn9L.js";import"./useDescendant-BpgT1WKN.js";import"./useClientLayoutEffect-DFb_s-96.js";import"./DismissableLayer-DYtyoKZr.js";import"./ChevronRight-BSX2iobi.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
