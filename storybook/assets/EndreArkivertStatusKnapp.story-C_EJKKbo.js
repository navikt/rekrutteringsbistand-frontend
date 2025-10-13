import{r as i,j as e,e as l}from"./iframe-CGQVJkZv.js";import{E as s}from"./EndreArkivertStatusModal-DMc0pg_e.js";import{A as a}from"./ActionMenu-BMSgeeWe.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-z4cn_Tu6.js";import"./OrganisasjonsnummerAlert-C37u_xfx.js";import"./VStack-C5KzQuUX.js";import"./BasePrimitive-s2EheN14.js";import"./List-CNdOL3td.js";import"./Link-BRD7cyqO.js";import"./KandidatHendelseTag-B9e_GCjh.js";import"./Tag-BYGMQyUB.js";import"./ChatExclamationmark-Ctf9I7R-.js";import"./FileXMark-CkGUbLaq.js";import"./Trash-Cfm_mnaq.js";import"./HandShakeHeart-Ct4yzxQW.js";import"./Calendar-KW0SH5xc.js";import"./ThumbUp-VvYbW0ZU.js";import"./Table-Cs32rzIX.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B2m8-gjm.js";import"./format-CR1bAaa0.js";import"./match-BSb9op-T.js";import"./parseISO-DERGW5BV.js";import"./parse-CIYjvRWn.js";import"./getDefaultOptions-B1f2vFnt.js";import"./util-TyBsJmZS.js";import"./Modal-BYl4lG1R.js";import"./floating-ui.react-BhfoJmgs.js";import"./Date.Input-BF_igJ6F.js";import"./useFormField-DAHFiV9C.js";import"./ReadMore-jjn0L2Ni.js";import"./useControllableState-CIPclepf.js";import"./ChevronDown-CotaTqsc.js";import"./Modal.context-aOxf75o7.js";import"./Portal-DDIXA7Go.js";import"./useDescendant-eu_fnbno.js";import"./useClientLayoutEffect-CKYD5ZqV.js";import"./DismissableLayer-uB2_gaYD.js";import"./ChevronRight-eBnpzqjh.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
