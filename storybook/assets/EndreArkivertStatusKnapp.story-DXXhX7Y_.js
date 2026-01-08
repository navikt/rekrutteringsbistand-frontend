import{r as i,j as e,d as p}from"./iframe-Dyt_T7m6.js";import{E as s}from"./EndreArkivertStatusModal-D6eFF5Ad.js";import{A as a}from"./ActionMenu-DdjrqTPO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BmQ3_LZW.js";import"./OrganisasjonsnummerAlert-DTZjl3VS.js";import"./VStack-DWc1CUQh.js";import"./BasePrimitive-C1_093tT.js";import"./List-Bt7-k4HX.js";import"./Link-BCv8MBzM.js";import"./KandidatHendelseTag-Y0mgIzOj.js";import"./Tag-D4Y1Cqw5.js";import"./ChatExclamationmark-BVdSPkea.js";import"./FileXMark-DoKWH1ss.js";import"./Trash-DZwPj-5f.js";import"./HandShakeHeart-DPccg_IV.js";import"./Calendar-CeSAK0Un.js";import"./ThumbUp-Dzc_N9Xd.js";import"./ExclamationmarkTriangle-BdW4S9lt.js";import"./Table-BuuVOVox.js";import"./index-BRPiLR4n.js";import"./index-B40KJ5b4.js";import"./util-DIY1dJO9.js";import"./Modal-CJJnMamE.js";import"./floating-ui.react-3SqnOr-M.js";import"./Date.Input-CBzSduVo.js";import"./useFormField-dlOh0Y30.js";import"./useControllableState-eGZPEQXj.js";import"./ChevronDown-B0uTgkqP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Ckgmqoa4.js";import"./Modal.context-BfInQaLM.js";import"./Portal-uLg2Fxcm.js";import"./useLatestRef-DXwQ7Qir.js";import"./useDescendant-BSBfX3vQ.js";import"./DismissableLayer-C1EC1IHS.js";import"./Floating-cqXqAp7k.js";import"./ChevronRight-CRolrl9z.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
