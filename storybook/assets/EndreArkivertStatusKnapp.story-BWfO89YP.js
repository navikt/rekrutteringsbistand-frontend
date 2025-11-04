import{r as i,j as e,d as l}from"./iframe-DggTbHTG.js";import{E as s}from"./EndreArkivertStatusModal-CdPXobFK.js";import{A as a}from"./ActionMenu-cHcsYIl8.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DMeHDc5N.js";import"./OrganisasjonsnummerAlert-M41sRSNT.js";import"./VStack-hdgZhtTs.js";import"./BasePrimitive-ByuUTuzm.js";import"./List-BSPQku7V.js";import"./Link-pfPgYY8Y.js";import"./KandidatHendelseTag-BaFxykvB.js";import"./Tag-BRlhBhoK.js";import"./ChatExclamationmark-Byyi9_9c.js";import"./FileXMark-OJrkdDfU.js";import"./Trash-CjvBN-wi.js";import"./HandShakeHeart-6_l6UwHP.js";import"./Calendar-Dxt1eeUH.js";import"./ThumbUp-DqjOC6jP.js";import"./Table-C8w8VGPD.js";import"./util-bQi_RKn_.js";import"./parse-B8VYaoTJ.js";import"./getDefaultOptions-C5cRSyku.js";import"./parseISO-7GUi4n0B.js";import"./index-DuzJlVVz.js";import"./index-B40KJ5b4.js";import"./isBefore-DVy4mKQn.js";import"./util-CRSb4gnp.js";import"./Modal-DkW9jzHA.js";import"./floating-ui.react-DflCFKju.js";import"./Date.Input-DjvJoNOi.js";import"./useFormField-Q0UaUZO-.js";import"./useControllableState-D2XNC1Vd.js";import"./ChevronDown-BhX91dAV.js";import"./Modal.context-naP120KI.js";import"./Portal-U4yIgKE0.js";import"./useDescendant-Cq0mvZy6.js";import"./useClientLayoutEffect-BCXuvgkk.js";import"./DismissableLayer-KaqTptve.js";import"./Floating-BAbRWPmT.js";import"./ChevronRight-DVqHM1z4.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
