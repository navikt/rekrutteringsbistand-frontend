import{r as i,j as e,e as p}from"./iframe-D0GwblT9.js";import{E as s}from"./EndreArkivertStatusModal-BP3HgGNl.js";import{A as a}from"./ActionMenu-CmMyC481.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-uZfcIBzt.js";import"./OrganisasjonsnummerAlert-DPiffhI3.js";import"./VStack-DfBEpgKB.js";import"./BasePrimitive-UD7NlCQ0.js";import"./List-BRv2j5Bv.js";import"./Link-D9_Md5d7.js";import"./KandidatHendelseTag-BFY25_C2.js";import"./Tag-CguSApHK.js";import"./FileXMark-BkMS0TzM.js";import"./Trash-CS_c5_23.js";import"./HandShakeHeart-s5_1MJ0t.js";import"./Calendar-ePF77qUm.js";import"./ThumbUp-H-K5QnVH.js";import"./Table-6gCLUur0.js";import"./util-CGf6D49c.js";import"./format-BqKlHFwg.js";import"./match-Bysio2Q7.js";import"./parseISO-D1SCS3cY.js";import"./parse-Dwt_9sBn.js";import"./getDefaultOptions-C4E30K8G.js";import"./util-Dv4KQlRL.js";import"./Modal-BMbaFcl7.js";import"./floating-ui.react-Br6_DC9v.js";import"./Date.Input-CynUqluh.js";import"./useFormField-BN4HxSCa.js";import"./useControllableState-bKZctjKQ.js";import"./ChevronDown-B_Sd0WQW.js";import"./Modal.context-DI9DxRcm.js";import"./Portal-VYoAVI_M.js";import"./useDescendant-C6ZI4kS1.js";import"./useClientLayoutEffect-B_75iQJq.js";import"./DismissableLayer-CmDka2Tt.js";import"./Floating-CkWYrhuc.js";import"./ChevronRight-DH7YTAzA.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
