import{r as i,j as e,o as l}from"./iframe-CjKR20BC.js";import{E as s}from"./EndreArkivertStatusModal-BbF5-x1W.js";import{A as a}from"./ActionMenu--H_D2Tf0.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-OpMdsle5.js";import"./OrganisasjonsnummerAlert-sFY24i-k.js";import"./VStack-BsXqGekW.js";import"./BasePrimitive-CaBgxhbE.js";import"./List-BTmbOlVO.js";import"./Link-Bo6mtrNI.js";import"./KandidatHendelseTag-DfF6i5Jw.js";import"./Tag-wvT3nD46.js";import"./ChatExclamationmark-mD1OYTO5.js";import"./FileXMark-QgeazkCH.js";import"./Trash-D7LhkQ4B.js";import"./HandShakeHeart-C7oIGzp0.js";import"./Calendar-w3e5z85I.js";import"./ThumbUp-DN2dUS2g.js";import"./Table-CRzPg50P.js";import"./util-DJhqGnO3.js";import"./format-CSKBpAGE.js";import"./match-Cl20IGZX.js";import"./parse-DJYX9sRd.js";import"./getDefaultOptions-ZyZ1VfiA.js";import"./parseISO-CNiVbHcC.js";import"./index-CEKpCU6D.js";import"./index-B40KJ5b4.js";import"./isBefore-C5zPZljL.js";import"./util-CxD7CZfs.js";import"./Modal-B2EuYQ4J.js";import"./floating-ui.react-CQJkre1v.js";import"./Date.Input-BNLwAM5u.js";import"./useFormField-CLSriUsV.js";import"./useControllableState-CjVFov-N.js";import"./ChevronDown-BxxgTCqk.js";import"./Modal.context-Bj39DRJf.js";import"./Portal-HFsL0bcf.js";import"./useDescendant-BJjA5T6g.js";import"./useClientLayoutEffect-BLLZDShU.js";import"./DismissableLayer-jW99rNmR.js";import"./Floating-CbWlXCW6.js";import"./ChevronRight-BX43PvTr.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
