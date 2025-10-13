import{r as i,j as e,e as p}from"./iframe-B32qNefX.js";import{E as s}from"./EndreArkivertStatusModal-CgzDAXkS.js";import{A as a}from"./ActionMenu-DDhhkp-Y.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrISJs4o.js";import"./OrganisasjonsnummerAlert-DVGO9JVc.js";import"./VStack-DFkjK8C8.js";import"./BasePrimitive-CdkbGHJE.js";import"./List-CjDu2wlh.js";import"./Link-CP7bvi09.js";import"./KandidatHendelseTag-fn8eQ-M4.js";import"./Tag-PkXEKTsX.js";import"./FileXMark-DDyjaQZP.js";import"./Trash-BCQdTe5O.js";import"./HandShakeHeart-cInNHyDW.js";import"./Calendar-Bwyidtct.js";import"./ThumbUp-JhG_Nyhr.js";import"./Table-NKXcIsJo.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-DbPJsKGZ.js";import"./format-uYcW2n3z.js";import"./match-CMgwdI-q.js";import"./parseISO-djV4R28G.js";import"./parse-Ik5otwk5.js";import"./getDefaultOptions-IbWvzyFj.js";import"./util-CBHRAVYp.js";import"./Modal-DsX37BP8.js";import"./floating-ui.react-CnRFprKk.js";import"./Date.Input-X7eAZKs2.js";import"./useFormField-nToWHv09.js";import"./useControllableState--ugcGh6c.js";import"./ChevronDown-CjecZT6b.js";import"./Modal.context-CHSEilAo.js";import"./Portal-CwVsesJZ.js";import"./useDescendant-CzVCYVyK.js";import"./useClientLayoutEffect-DcT_OAyU.js";import"./DismissableLayer-Abfm5WT2.js";import"./ChevronRight-DYhXFd3K.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
