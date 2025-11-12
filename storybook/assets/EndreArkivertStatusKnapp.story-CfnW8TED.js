import{r as i,j as e,d as l}from"./iframe-CC24wDKQ.js";import{E as s}from"./EndreArkivertStatusModal-kWd-trsn.js";import{A as a}from"./ActionMenu-CqWuWUCo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dr34UCLz.js";import"./OrganisasjonsnummerAlert-6o4J3Zq8.js";import"./VStack-BfiJmBsb.js";import"./BasePrimitive-RaTy3Sqj.js";import"./List-BxJq4101.js";import"./Link-CLwnBQe7.js";import"./KandidatHendelseTag-DZm75Qvb.js";import"./Tag-DgZXKrLS.js";import"./ChatExclamationmark-CuAiLPOl.js";import"./FileXMark-DakMo6k3.js";import"./Trash-Cfv936UM.js";import"./HandShakeHeart-CwpdiEo3.js";import"./Calendar-Qlc-HePb.js";import"./ThumbUp-BMmej0A7.js";import"./Table-CvBE8rLO.js";import"./util-CwXuo_Oh.js";import"./parse-h5OPM2AO.js";import"./getDefaultOptions-DVLcaaiq.js";import"./parseISO-CY1zYzdS.js";import"./index-BWfBt7yf.js";import"./index-B40KJ5b4.js";import"./isBefore-V34-X8qa.js";import"./util-BYQIEfzV.js";import"./Modal-DvEczSJU.js";import"./floating-ui.react-BZgD_ST-.js";import"./Date.Input-CXtqeAvR.js";import"./useFormField-18lvTvbK.js";import"./useControllableState-CcDs5zF6.js";import"./ChevronDown-oQKRzDt4.js";import"./Modal.context-BxhMUhwK.js";import"./Portal-Cq7Vcuay.js";import"./useDescendant-DT7mSqql.js";import"./useClientLayoutEffect-BN154P74.js";import"./DismissableLayer-76B8ouvV.js";import"./Floating-Ulanxzme.js";import"./ChevronRight-B_9E0DCJ.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
