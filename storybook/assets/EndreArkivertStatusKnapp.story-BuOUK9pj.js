import{j as e,c as d,r as p}from"./iframe-FHkBCfVU.js";import"./KandidatlisteContext-CBVuysWM.js";import{A as i}from"./ActionMenu-D6nRUrwb.js";import{S as m}from"./KandidatHendelseTag-Df4d563E.js";import{S as u}from"./Trash-Cn7CUgoq.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-sQEFORFl.js";import"./VStack-C2l0CBZp.js";import"./BasePrimitive-AqEGMIdf.js";import"./Box-Cx_R66cD.js";import"./List-DzFasrsC.js";import"./Link-glYRQlo0.js";import"./index-BvMoKo9a.js";import"./index-CWbL8d4M.js";import"./util-D3vyYHyo.js";import"./Modal.context-DfI42K82.js";import"./Portal-CwAZzS7w.js";import"./useDescendant-COL2doGN.js";import"./DismissableLayer-DAyJ5Ecl.js";import"./Floating-CNGg34o0.js";import"./useOpenChangeAnimationComplete-GbbXLZ1x.js";import"./useValueAsRef-Dzx2Ys5u.js";import"./FocusBoundary-Bhuz3AHl.js";import"./useControllableState-C70irtDf.js";import"./ChevronRight-CmKJcyXI.js";import"./Tag-B9dItanu.js";import"./ChatExclamationmark-BqaaBmvF.js";import"./FileXMark-BdimZ12H.js";import"./HandShakeHeart-DKyPgZrc.js";import"./Calendar-Co3HCRrj.js";import"./ThumbUp-DmclQqxp.js";import"./ExclamationmarkTriangle-r7Yzqlf4.js";import"./Table-Bpn6wA5d.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,P as default};
