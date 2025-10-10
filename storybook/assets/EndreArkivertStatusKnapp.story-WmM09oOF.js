import{r as i,j as e,d as p}from"./iframe-DYYFo0EH.js";import{E as s}from"./EndreArkivertStatusModal-CDV5xh42.js";import{A as a}from"./ActionMenu-CJMnXbUu.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrLAHCvX.js";import"./OrganisasjonsnummerAlert-HgqZSHB0.js";import"./VStack-j-RBo0EF.js";import"./BasePrimitive-B0IXe4ka.js";import"./List-DTt7xmmf.js";import"./Link-CNFJiH9C.js";import"./KandidatHendelseTag-DVUA1DLO.js";import"./Tag-D2CeUP6F.js";import"./FileXMark-CsvJoHtv.js";import"./Trash-CevoRqAe.js";import"./HandShakeHeart-XuBXKhfa.js";import"./Calendar-DiB-DZyk.js";import"./ThumbUp-DEb0cCvQ.js";import"./Table-DWEIgR03.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-DLV4rgvl.js";import"./format-bK3tkYVY.js";import"./match-DHpari-S.js";import"./parseISO-Cld3lj8D.js";import"./parse-L4yLavaV.js";import"./getDefaultOptions-D_tEuKPk.js";import"./util-ChfO-3K-.js";import"./Modal-CNZnnLcK.js";import"./floating-ui.react-2_orn2KK.js";import"./Date.Input-9XOu-ODO.js";import"./useFormField-BPvZy4Bw.js";import"./useControllableState-C1UEeCeb.js";import"./ChevronDown-BUmHjXl6.js";import"./Modal.context-D42TXc5u.js";import"./Portal-eVIvpB1m.js";import"./useDescendant-BnhCHh0R.js";import"./useClientLayoutEffect-B-_2lxSY.js";import"./DismissableLayer-BJBH2qe4.js";import"./ChevronRight-BKNX-eRu.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
