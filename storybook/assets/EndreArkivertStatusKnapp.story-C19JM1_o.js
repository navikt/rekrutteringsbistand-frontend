import{r as i,j as e,d as p}from"./iframe-BKDoWgHq.js";import{E as s}from"./EndreArkivertStatusModal-Dqos3DDd.js";import{A as a}from"./ActionMenu-2c7SeFJg.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-gV7m6E18.js";import"./OrganisasjonsnummerAlert-CfPcIFBz.js";import"./VStack-B3A9RY2q.js";import"./BasePrimitive-CT8NIZJE.js";import"./List-Buho69gq.js";import"./Link-DFwMo79Q.js";import"./KandidatHendelseTag-Brl649es.js";import"./Tag-BUt2pJu8.js";import"./FileXMark-FeDq2Ysf.js";import"./Trash-rtYXz7QZ.js";import"./HandShakeHeart-DTrI0IiB.js";import"./Calendar-cy2kGKa4.js";import"./ThumbUp-BrJ85Q8J.js";import"./Table-DMk5gh2_.js";import"./util-ClF0mEkr.js";import"./format-CDKvSNBp.js";import"./match-BQKLQD_5.js";import"./parse-S4GxuH9G.js";import"./getDefaultOptions-C8ODERZH.js";import"./parseISO-Ci-fRiyg.js";import"./util-DEm2Fd7B.js";import"./Modal-DT3kgKxc.js";import"./floating-ui.react-BGZ9fdcN.js";import"./Date.Input-BcSHn9sJ.js";import"./useFormField-3mzbgjvi.js";import"./useControllableState-B3Jf7pLK.js";import"./ChevronDown-DAqA53JU.js";import"./Modal.context-D_pCVJiM.js";import"./Portal-Bd4eFCCq.js";import"./useDescendant-qpp5_fZY.js";import"./useClientLayoutEffect-CucVCiA2.js";import"./DismissableLayer-Bs8j9pC3.js";import"./Floating-CLdWoEQ0.js";import"./ChevronRight-Cinm4EMV.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
