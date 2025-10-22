import{r as i,j as e,o as p}from"./iframe-CQcQKVHJ.js";import{E as s}from"./EndreArkivertStatusModal-DCC4SyoA.js";import{A as a}from"./ActionMenu-BdNNJqF3.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CLD8Yobj.js";import"./OrganisasjonsnummerAlert-C3V9N-mA.js";import"./VStack-BkcKOsGL.js";import"./BasePrimitive-R7dqkGXT.js";import"./List-oE4KN9Jk.js";import"./Link-CNM6WXAJ.js";import"./KandidatHendelseTag-_wYeKXt7.js";import"./Tag-B1UgeQBj.js";import"./FileXMark-Bs2UkFRM.js";import"./Trash-BXz9vHTO.js";import"./HandShakeHeart-1ht42tEv.js";import"./Calendar-DLiZi9ru.js";import"./ThumbUp-BZVFYXyc.js";import"./Table-Dxrl4W2c.js";import"./util-D4RQEmo9.js";import"./format-CArDlM88.js";import"./match-CzCdKmhZ.js";import"./parse-CAYOWmc-.js";import"./getDefaultOptions-CQzlSNmC.js";import"./parseISO-CD2GUqTb.js";import"./util-B1ze5Nv7.js";import"./Modal-CTeQBcRN.js";import"./floating-ui.react-DEmG-l0u.js";import"./Date.Input-EHz2oxZ9.js";import"./useFormField-BFganqKl.js";import"./useControllableState-3MLhtD_J.js";import"./ChevronDown-D-JqxndO.js";import"./Modal.context-Ab6UYj-Y.js";import"./Portal-CLIJeP_T.js";import"./useDescendant-fkukH1Ut.js";import"./useClientLayoutEffect-DFs0Tmsn.js";import"./DismissableLayer-B5sCW8rV.js";import"./Floating-DXUmQWD5.js";import"./ChevronRight-DHQhNGvm.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
