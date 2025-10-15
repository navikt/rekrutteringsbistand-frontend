import{r as i,j as e,e as l}from"./iframe-sZP266bO.js";import{E as s}from"./EndreArkivertStatusModal-CTYzng9-.js";import{A as a}from"./ActionMenu-B1gn0K83.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CKAF9csg.js";import"./OrganisasjonsnummerAlert-mxL8c4sm.js";import"./VStack-M5Jjoz8J.js";import"./BasePrimitive-CRPU5RNY.js";import"./List-DENPbORg.js";import"./Link-DQiMEZnz.js";import"./KandidatHendelseTag-AZu_skbn.js";import"./Tag-6IwzmMUZ.js";import"./ChatExclamationmark-DKfmyToB.js";import"./FileXMark-Da-f6SDk.js";import"./Trash-DMQ8OD7z.js";import"./HandShakeHeart-BTWM6TMD.js";import"./Calendar-Ckrf9MyK.js";import"./ThumbUp-vcLRfdLn.js";import"./Table-B8AVpSdn.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B9DhuNjA.js";import"./format-Dn1NmLY-.js";import"./match-CqaFT2ci.js";import"./parseISO-D6y3GPfQ.js";import"./parse-Cn_HLpVL.js";import"./getDefaultOptions-CxkFBLQq.js";import"./util-CYpKB-mD.js";import"./Modal-CaeODgAl.js";import"./floating-ui.react-smFhzZVY.js";import"./Date.Input-CcqUSilb.js";import"./useFormField-C_CCgozA.js";import"./useControllableState-cbYrnx3z.js";import"./ChevronDown-ClqKVkNC.js";import"./Modal.context-DYFw0clZ.js";import"./Portal-BLSwp3Mj.js";import"./useDescendant-CsOSZ5Fo.js";import"./useClientLayoutEffect-hVLPoxGw.js";import"./DismissableLayer-BBn0wG8l.js";import"./ChevronRight-Bt5Z7Lk8.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
