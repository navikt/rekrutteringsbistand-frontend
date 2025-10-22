import{r as i,j as e,o as l}from"./iframe-CFPerreN.js";import{E as s}from"./EndreArkivertStatusModal-SNAXVw8h.js";import{A as a}from"./ActionMenu-DfHINVVG.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DbyYA3lg.js";import"./OrganisasjonsnummerAlert-_IJk2d2H.js";import"./VStack-BBO2SMmH.js";import"./BasePrimitive-DQxgn5I-.js";import"./List-D70wJ2WL.js";import"./Link-CjMY8Y91.js";import"./KandidatHendelseTag-DZWy4QIZ.js";import"./Tag-BcgSs725.js";import"./ChatExclamationmark-BWol-AQi.js";import"./FileXMark-DmlcMlCZ.js";import"./Trash-BXdMlBC3.js";import"./HandShakeHeart-BKmIWuvG.js";import"./Calendar-CizdEyps.js";import"./ThumbUp-CXARo9HL.js";import"./Table-CIayWjTW.js";import"./util-Ny31ce32.js";import"./format-Dlji57sT.js";import"./match-Ddj5mRs6.js";import"./parse-ByiE-1KN.js";import"./getDefaultOptions-DoSM8sBS.js";import"./parseISO-F7SnvxB9.js";import"./util-DmWt790Q.js";import"./Modal-B3ndqrmr.js";import"./floating-ui.react-CDIUzIAN.js";import"./Date.Input-BKsvLY9l.js";import"./useFormField-Bmffen5_.js";import"./useControllableState-3kn0Fx76.js";import"./ChevronDown-C2Xb0Hp_.js";import"./Modal.context-0umXxUAh.js";import"./Portal-v4euiJo1.js";import"./useDescendant-C6lh1Pga.js";import"./useClientLayoutEffect-BPoH14GW.js";import"./DismissableLayer-BJVNuyiY.js";import"./Floating-BQMv3uS6.js";import"./ChevronRight-KjIWhyZQ.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
