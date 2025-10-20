import{r as i,j as e,e as l}from"./iframe-Bs62DkEX.js";import{E as s}from"./EndreArkivertStatusModal-DyxWAOwx.js";import{A as a}from"./ActionMenu-DvZuYZnV.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CmU3_d-G.js";import"./OrganisasjonsnummerAlert-BB6dOjTW.js";import"./VStack-DErorjmi.js";import"./BasePrimitive-hqgAfBeE.js";import"./List-D4X4XiY5.js";import"./Link-C-FD5pVt.js";import"./KandidatHendelseTag-DASbdwf-.js";import"./Tag-aBUAMrEB.js";import"./ChatExclamationmark-BjS5JwFD.js";import"./FileXMark-B1A4YTzE.js";import"./Trash-BE175DFP.js";import"./HandShakeHeart-By1TwYOi.js";import"./Calendar-B-bTdlPX.js";import"./ThumbUp-CraOnywH.js";import"./Table-MswEoFGk.js";import"./util-DFhn6qLM.js";import"./format-Ca2I7mTu.js";import"./match-DGpmc3fc.js";import"./parseISO-D4cIKA-0.js";import"./parse-BnkTT2en.js";import"./getDefaultOptions-CLP4Qnh0.js";import"./util-DmMa8XpB.js";import"./Modal-D_wK6Ohn.js";import"./floating-ui.react-BzSxB3LF.js";import"./Date.Input-DZNBgtRi.js";import"./useFormField-DiCDh7BC.js";import"./useControllableState-CF1ufetu.js";import"./ChevronDown-DToF2878.js";import"./Modal.context-CgSnuUz-.js";import"./Portal-BmP1xslG.js";import"./useDescendant-N-iOhkBw.js";import"./useClientLayoutEffect-DGTQ09bR.js";import"./DismissableLayer-BZd4Nxc3.js";import"./Floating-lWqBxALE.js";import"./ChevronRight-Cz4EgxZU.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
