import{r as s,j as e,d as p}from"./iframe-DQ9jaFGK.js";import{E as i}from"./EndreArkivertStatusModal-DECxu02F.js";import{A as a}from"./ActionMenu-DF6oXLuI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CCC2LAFj.js";import"./OrganisasjonsnummerAlert-xlVa5bNe.js";import"./VStack-CMJ94HfX.js";import"./BasePrimitive-Cf9-LRZa.js";import"./List-CZQ4RYE8.js";import"./Link-BuAt7cTQ.js";import"./KandidatHendelseTag-C4zTeyWG.js";import"./Tag-CmBIKPGT.js";import"./ChatExclamationmark-gSzlTHtR.js";import"./FileXMark-CSYk3rQP.js";import"./Trash-Czat1Rnr.js";import"./HandShakeHeart-CdRe9YLa.js";import"./Calendar-qn7P5lxv.js";import"./ThumbUp-mWHy6P4x.js";import"./Table-qqatYIvr.js";import"./index-dEhE5YbD.js";import"./index-B40KJ5b4.js";import"./util-DSzzi24A.js";import"./Modal-VZLky371.js";import"./floating-ui.react-Cvkhx2J8.js";import"./Date.Input-B6LpgIQE.js";import"./useFormField-BvSbIY0c.js";import"./useControllableState-BweIuYLw.js";import"./ChevronDown-CFJFU5Q5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DlE4khJJ.js";import"./Modal.context-B9jifhTW.js";import"./Portal-yI0zIr1p.js";import"./useLatestRef-BRu3YlNO.js";import"./useDescendant-CBzkeEGZ.js";import"./DismissableLayer-CEPiaV-H.js";import"./Floating-DJT_DgxX.js";import"./ChevronRight-RtLW1mCX.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
