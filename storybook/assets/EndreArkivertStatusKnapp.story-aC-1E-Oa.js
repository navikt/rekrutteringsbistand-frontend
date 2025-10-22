import{r as i,j as e,o as l}from"./iframe-COgBtDGK.js";import{E as s}from"./EndreArkivertStatusModal-C8Nhi5Vk.js";import{A as a}from"./ActionMenu-BeODHAnH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BT1IvZO-.js";import"./OrganisasjonsnummerAlert-D6USNHN1.js";import"./VStack-Dgyxm1dh.js";import"./BasePrimitive-DvD-32Tp.js";import"./List-BFBnVhoE.js";import"./Link-n08tJgBH.js";import"./KandidatHendelseTag-DbK6GcHx.js";import"./Tag-CJY0PnxR.js";import"./ChatExclamationmark-CRFEpTjS.js";import"./FileXMark-BVAq9xL2.js";import"./Trash-tgTqNADo.js";import"./HandShakeHeart-CDQq8RCR.js";import"./Calendar-Dvccs2fA.js";import"./ThumbUp-juI5huSc.js";import"./Table-Bf9-HaFJ.js";import"./util-DaF0eFxC.js";import"./format-Bjv3Zmuc.js";import"./match-DP84vVhp.js";import"./parse-CShcNZWD.js";import"./getDefaultOptions-B5vsIIWS.js";import"./parseISO-DQplc_F1.js";import"./util-BsgEYL50.js";import"./Modal-C4wcq4dg.js";import"./floating-ui.react-SVUjMJpY.js";import"./Date.Input-CSrBc5nm.js";import"./useFormField-DF-0UKIt.js";import"./useControllableState-DDAZjlVK.js";import"./ChevronDown-BBOTSGi1.js";import"./Modal.context-BuPf6RVG.js";import"./Portal-BaQKf7QJ.js";import"./useDescendant-CzD_2ZUQ.js";import"./useClientLayoutEffect-DmTdPo_m.js";import"./DismissableLayer-5nsHy544.js";import"./Floating-DKkDqPMj.js";import"./ChevronRight-BLYo94X_.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
