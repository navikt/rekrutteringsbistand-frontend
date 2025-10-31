import{r as i,j as e,d as l}from"./iframe-CVBkVRHF.js";import{E as s}from"./EndreArkivertStatusModal-C4l-HSnu.js";import{A as a}from"./ActionMenu-D_w8MqwY.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BpOZnLcj.js";import"./OrganisasjonsnummerAlert-Dp5HlO_N.js";import"./VStack-Cq6dbmLc.js";import"./BasePrimitive-BeBnSchP.js";import"./List-DZ2GVroy.js";import"./Link-BOVfU6gi.js";import"./KandidatHendelseTag-EjcTTuP0.js";import"./Tag-BADpau7b.js";import"./ChatExclamationmark-IenPoPHO.js";import"./FileXMark-zzWBa9Eq.js";import"./Trash-Bacxo7n-.js";import"./HandShakeHeart-BjCe4tGN.js";import"./Calendar-B6KviKfM.js";import"./ThumbUp-BZH0LyNq.js";import"./Table-BIxD-IXk.js";import"./util-BYyFu15r.js";import"./parse-B3lIiDIH.js";import"./getDefaultOptions-DGJkWuW5.js";import"./parseISO-DJBs45yK.js";import"./index-CrQSO_VJ.js";import"./index-B40KJ5b4.js";import"./isBefore-BLy3e1RW.js";import"./util-BXWN6ppT.js";import"./Modal-DwOvZulO.js";import"./floating-ui.react-DeZxRt_-.js";import"./Date.Input-oFcR67dI.js";import"./useFormField-Bz__yru5.js";import"./useControllableState-mI0byIJB.js";import"./ChevronDown-DXP1Hd-m.js";import"./Modal.context-BtREQe4S.js";import"./Portal-Bj1bueEp.js";import"./useDescendant-DynX6z6M.js";import"./useClientLayoutEffect-Cfimm8us.js";import"./DismissableLayer-CZ0MdCHW.js";import"./Floating-C0QBhnv8.js";import"./ChevronRight-DbY0nupu.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
