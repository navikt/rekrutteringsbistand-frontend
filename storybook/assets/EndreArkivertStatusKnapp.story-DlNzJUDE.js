import{r as i,j as e,e as p}from"./iframe-BltkUtmC.js";import{E as s}from"./EndreArkivertStatusModal-CdGFX-zS.js";import{A as a}from"./ActionMenu-lrrah2Jm.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ce-zi_zz.js";import"./OrganisasjonsnummerAlert-DDL7fw1q.js";import"./VStack-B9bjwo3B.js";import"./BasePrimitive-DAjONjQL.js";import"./List-CUxXFdQr.js";import"./Link-CgUQg2re.js";import"./KandidatHendelseTag-BLtnp3G2.js";import"./Tag-BEtLAmBu.js";import"./FileXMark-BmobqouE.js";import"./Trash-a4Yvwzwz.js";import"./HandShakeHeart-CHnXOj98.js";import"./Calendar-Cc086Lfd.js";import"./ThumbUp-DQ8y91R2.js";import"./Table-C0yHzIsv.js";import"./util-CZhmV-S2.js";import"./format-ybDTxhh7.js";import"./match-BLrIinR6.js";import"./parseISO-C3vqRaHz.js";import"./parse-f1XXS1lv.js";import"./getDefaultOptions-CSasNev0.js";import"./util-CLZpmQTt.js";import"./Modal-C1-8VaRB.js";import"./floating-ui.react-DxCSJHHz.js";import"./Date.Input-DJyfvOgD.js";import"./useFormField-DPiTQzna.js";import"./useControllableState-B-0TJHvp.js";import"./ChevronDown-Co0F-4GE.js";import"./Modal.context-7dX16PMC.js";import"./Portal-Beudir3y.js";import"./useDescendant-BCNbsdQP.js";import"./useClientLayoutEffect-lwX3CJFu.js";import"./DismissableLayer-DvTyJPL-.js";import"./Floating-CDsu0sep.js";import"./ChevronRight-D4efDkSO.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
