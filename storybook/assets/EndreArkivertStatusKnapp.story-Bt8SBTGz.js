import{r as i,j as e,d as l}from"./iframe-C8jcw7Cb.js";import{E as s}from"./EndreArkivertStatusModal-D03trZJo.js";import{A as a}from"./ActionMenu-DiwdhF_O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DnY9EEzK.js";import"./OrganisasjonsnummerAlert-BCFTfpSG.js";import"./VStack-BNepLD7v.js";import"./BasePrimitive-j6bcQoiE.js";import"./List-DbyFyqGt.js";import"./Link-DGq1BhO6.js";import"./KandidatHendelseTag-CXaL0pNj.js";import"./Tag-sxlF9RpW.js";import"./ChatExclamationmark-DBdosOr8.js";import"./FileXMark-BbhoTwvO.js";import"./Trash-Bvh1x_kE.js";import"./HandShakeHeart-B07m9nhL.js";import"./Calendar-B4h891om.js";import"./ThumbUp-4m2Eb0GJ.js";import"./Table-CLMLU_P6.js";import"./util-CSHBdDyM.js";import"./format-lbXZMvYQ.js";import"./match-BdPrbPLE.js";import"./parse-Dy9tyMs5.js";import"./getDefaultOptions-DcxZO1Sq.js";import"./parseISO-5MriDrOw.js";import"./index-znWfUUuP.js";import"./index-B40KJ5b4.js";import"./isBefore-BDjvwerj.js";import"./util-tI648GuU.js";import"./Modal-AuWpHQsv.js";import"./floating-ui.react-BmbGXzjv.js";import"./Date.Input-uaTAZs0d.js";import"./useFormField-DsCr0zyN.js";import"./useControllableState-BUOfQ_y2.js";import"./ChevronDown-D0XiWsMN.js";import"./Modal.context-DvXrykWw.js";import"./Portal-BMuERbjK.js";import"./useDescendant-DOBRuPMz.js";import"./useClientLayoutEffect-CidqHgOF.js";import"./DismissableLayer-CkLRBbqP.js";import"./Floating-CbAiKXR7.js";import"./ChevronRight-fFUI5Z_W.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
