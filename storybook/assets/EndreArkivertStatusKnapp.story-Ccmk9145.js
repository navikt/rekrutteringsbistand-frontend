import{r as i,j as e,e as p}from"./iframe-DomB5bjj.js";import{E as s}from"./EndreArkivertStatusModal-AzVPZBZZ.js";import{A as a}from"./ActionMenu-DQbLhF4s.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Un_AZNHM.js";import"./OrganisasjonsnummerAlert-Cx4V2j_h.js";import"./VStack-BIZJXBtz.js";import"./BasePrimitive-4zkMH27C.js";import"./List-Db0gO-es.js";import"./Link-BjAiGgN5.js";import"./KandidatHendelseTag-Bda8LXPK.js";import"./Tag-p63y2drH.js";import"./FileXMark-eMar8Um1.js";import"./Trash-DJRsp79v.js";import"./HandShakeHeart-KQIWCk1D.js";import"./Calendar-B4MnxOld.js";import"./ThumbUp-Bsw1Krcb.js";import"./Table-CzQYNK6w.js";import"./util-BrcKzcyk.js";import"./format-B6xbGTNx.js";import"./match-wFH0aIAd.js";import"./parseISO-ve8k0lUo.js";import"./parse-BoX7ZchI.js";import"./getDefaultOptions-CvH2z-S0.js";import"./util-CiK02jJ7.js";import"./Modal-Dhc5REPS.js";import"./floating-ui.react-KIjMCIJQ.js";import"./Date.Input-VTW74Tam.js";import"./useFormField-DeAjfiw7.js";import"./useControllableState-8E3oNcN9.js";import"./ChevronDown-cMXOGJdx.js";import"./Modal.context-B4LbjCDK.js";import"./Portal-odgNyupx.js";import"./useDescendant-_yY1UdUb.js";import"./useClientLayoutEffect-BJo3p9TX.js";import"./DismissableLayer-D78qK4dT.js";import"./Floating-wIq2G91J.js";import"./ChevronRight-E35L1M83.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
