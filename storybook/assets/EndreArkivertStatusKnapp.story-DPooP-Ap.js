import{r as i,j as e,d as l}from"./iframe-zbUhGjti.js";import{E as s}from"./EndreArkivertStatusModal-DffIi_s1.js";import{A as a}from"./ActionMenu-CoDOA7DS.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-5NBrRUDf.js";import"./OrganisasjonsnummerAlert-DogTccR8.js";import"./VStack-D2-FbYL0.js";import"./BasePrimitive-ByXS3CFE.js";import"./List-BzV1npJX.js";import"./Link-BLN5eTSs.js";import"./KandidatHendelseTag-CNs8YCU9.js";import"./Tag-K6bQ2sjM.js";import"./ChatExclamationmark-taundlQq.js";import"./FileXMark-Cby3Ptey.js";import"./Trash-BSWeFA-4.js";import"./HandShakeHeart-Bzm2p_pH.js";import"./Calendar-BZYoQ7OQ.js";import"./ThumbUp-B-CUqlMN.js";import"./Table-DJHoi2oR.js";import"./util-Bw9VNyjs.js";import"./parse-D_RlzfMW.js";import"./getDefaultOptions-BQd4M5Gn.js";import"./parseISO-DpZcFrkX.js";import"./index-Dx1cgU1m.js";import"./index-B40KJ5b4.js";import"./isBefore-Cfsyz_OO.js";import"./util-Cuj27M8w.js";import"./Modal-CN1dJgG6.js";import"./floating-ui.react-CORjjwzS.js";import"./Date.Input-D_14jgPo.js";import"./useFormField-DEptfI14.js";import"./useControllableState-9lWmz1GE.js";import"./ChevronDown-Di096zjX.js";import"./Modal.context-BQceTvJ2.js";import"./Portal-dbLiS4Dz.js";import"./useDescendant-D-B_Vd7C.js";import"./useClientLayoutEffect-0876YNTI.js";import"./DismissableLayer-BP_EiF3f.js";import"./Floating-qJt8neoQ.js";import"./ChevronRight-BZtnmoZu.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
