import{r as i,j as e,d as l}from"./iframe-DpIzbEh6.js";import{E as s}from"./EndreArkivertStatusModal-B8rnQzQ4.js";import{A as a}from"./ActionMenu-DicoRlcT.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8PB7bOg.js";import"./OrganisasjonsnummerAlert-DU6iBeu8.js";import"./VStack-DV-mKUsK.js";import"./BasePrimitive-CUveWDyh.js";import"./List-CjujHgjZ.js";import"./Link-Ckl8RwAe.js";import"./KandidatHendelseTag-DNdKryDm.js";import"./Tag-DoFMj22c.js";import"./ChatExclamationmark-DRIiMgdo.js";import"./FileXMark-YbK2oGrq.js";import"./Trash-ejeNRuoy.js";import"./HandShakeHeart-DoUmunwQ.js";import"./Calendar-yrgqPStg.js";import"./ThumbUp-NzJa49rm.js";import"./Table-D3jDpAO4.js";import"./dato-LgoA4Xw4.js";import"./parse-RftGy9Bo.js";import"./getDefaultOptions-wfwqw35y.js";import"./parseISO-3EvW_LXM.js";import"./index-CxfxYm7_.js";import"./index-B40KJ5b4.js";import"./util-Ds2nhTK-.js";import"./Modal-CzC-BiWi.js";import"./floating-ui.react-BeyQwPMw.js";import"./Date.Input-C0FLtTG3.js";import"./useFormField-Dj651Pd3.js";import"./useControllableState-DSjvWJiE.js";import"./ChevronDown-Be61l9Us.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BEllSSZA.js";import"./Modal.context-BiOdcH09.js";import"./Portal-Bd4pcY7T.js";import"./useLatestRef-DZfpDuBf.js";import"./useDescendant-DAw8jFwJ.js";import"./DismissableLayer-D8ZhvvRv.js";import"./Floating-CrCrwo6x.js";import"./ChevronRight-Ce31ZlYf.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
