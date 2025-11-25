import{r as i,j as e,d as l}from"./iframe-Cb_tEQhr.js";import{E as s}from"./EndreArkivertStatusModal-CdAS6z6z.js";import{A as a}from"./ActionMenu-0HEu-XJ_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BnCWjw_c.js";import"./OrganisasjonsnummerAlert-rFOKluri.js";import"./VStack-BF6CQz7r.js";import"./BasePrimitive-CjUx5R6Q.js";import"./List-Q3akeOZU.js";import"./Link-By8fj0RR.js";import"./KandidatHendelseTag-CuyYx9OW.js";import"./Tag-DTdzcQHr.js";import"./ChatExclamationmark-hnQ3EilH.js";import"./FileXMark-BrPH6AFj.js";import"./Trash-I0HNZ4vA.js";import"./HandShakeHeart-DPL39k2f.js";import"./Calendar-D0Df8Rs_.js";import"./ThumbUp-DCp6vNGP.js";import"./Table-DMgHc776.js";import"./dato-B5MZd2kF.js";import"./parse-BM__I-39.js";import"./getDefaultOptions-CUz3V4OU.js";import"./parseISO-15HIodIa.js";import"./index-8U9Br2Q7.js";import"./index-B40KJ5b4.js";import"./util-CMxWB8VY.js";import"./Modal-CxDUfJGc.js";import"./floating-ui.react-C8n_ZStl.js";import"./Date.Input-9jT1Lvgr.js";import"./useFormField-DFxSxc2F.js";import"./useControllableState-sczq1XDD.js";import"./ChevronDown-DVgyIXbK.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DGMrKY-N.js";import"./Modal.context-CaVH4yK8.js";import"./Portal-D0A8IGS7.js";import"./useLatestRef-CLkAHq4F.js";import"./useDescendant-CMQxtiNt.js";import"./DismissableLayer-DZ0-rpcq.js";import"./Floating-Cgs5zX-q.js";import"./ChevronRight-DxjImgj4.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
