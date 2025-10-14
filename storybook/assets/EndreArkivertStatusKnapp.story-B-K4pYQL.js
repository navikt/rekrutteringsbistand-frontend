import{r as i,j as e,e as p}from"./iframe-DMAO4dCV.js";import{E as s}from"./EndreArkivertStatusModal-DPM7Eepc.js";import{A as a}from"./ActionMenu-DrqPd4jX.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BA-skGqf.js";import"./OrganisasjonsnummerAlert-U4B-14BE.js";import"./VStack-H9H7uo4P.js";import"./BasePrimitive-DltdQK2v.js";import"./List-BO7tnBXi.js";import"./Link-C39Zqzcy.js";import"./KandidatHendelseTag-Cm0RTCOk.js";import"./Tag-CcXbwr3R.js";import"./FileXMark-CLJG14O_.js";import"./Trash-Ddpoy2cR.js";import"./HandShakeHeart-CLjzX3wp.js";import"./Calendar-0C-iFPZG.js";import"./ThumbUp-BLrpvnA0.js";import"./Table-DWlcU3_K.js";import"./util-D2HT7faN.js";import"./format-Di_xz1fb.js";import"./match-DZ2KMeUt.js";import"./parseISO-CN9Jj-x8.js";import"./parse-DsJXUTpL.js";import"./getDefaultOptions-BGLmWrnM.js";import"./util-C9-WZX9t.js";import"./Modal-DZZtdmg_.js";import"./floating-ui.react-BKlIVUh1.js";import"./Date.Input-DNo-mnrh.js";import"./useFormField-CjA7lB9L.js";import"./useControllableState-Cbu2ku7v.js";import"./ChevronDown-Bb--lgvd.js";import"./Modal.context-B7_Jj5qA.js";import"./Portal-ydlvizgj.js";import"./useDescendant-BDVhQCzW.js";import"./useClientLayoutEffect-Ct9g2HZI.js";import"./DismissableLayer-zlUEuIs5.js";import"./Floating-D7VagRJj.js";import"./ChevronRight-B4r8jmSj.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
