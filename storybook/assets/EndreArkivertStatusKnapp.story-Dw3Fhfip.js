import{r as i,j as e,e as p}from"./iframe-05oBaVfn.js";import{E as s}from"./EndreArkivertStatusModal-BdPkfTuE.js";import{A as a}from"./ActionMenu-BTt4JBRv.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BMcoCEUY.js";import"./OrganisasjonsnummerAlert-8qcE1i83.js";import"./VStack-1vjSpxqT.js";import"./BasePrimitive-pNF9eC2e.js";import"./List-BDBXu_9k.js";import"./Link-p2BgAcBD.js";import"./KandidatHendelseTag-B2gam4sj.js";import"./Tag-VBAtqkwm.js";import"./FileXMark-CsKpNh5P.js";import"./Trash-C72NRxO4.js";import"./HandShakeHeart-BirlqDY3.js";import"./Calendar-DwravAwF.js";import"./ThumbUp-D7_fBo-q.js";import"./Table-BKxuDwXI.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B0mFY22O.js";import"./format-C6aU4gM_.js";import"./match-DNHKAvxP.js";import"./parseISO-6O0VV1U3.js";import"./parse-UjKB24uP.js";import"./getDefaultOptions-DyEQjLT5.js";import"./util-B6qVNUUJ.js";import"./Modal-BVQTtIOQ.js";import"./floating-ui.react-CuoSq-8-.js";import"./Date.Input-13kb3myE.js";import"./useFormField-CLMYpey8.js";import"./useControllableState-BP2RiIUM.js";import"./ChevronDown-DiOK9z2y.js";import"./Modal.context-BkhHfaBb.js";import"./Portal-Do-PKnTg.js";import"./useDescendant-4VextY-n.js";import"./useClientLayoutEffect-AsqMjhrd.js";import"./DismissableLayer-BDOENNDa.js";import"./ChevronRight-CUOo5GmF.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
