import{j as e,a as d,r as p}from"./iframe-9y18Ssu8.js";import"./KandidatlisteContext-DUufdZz1.js";import{A as i}from"./ActionMenu-DE0WsSfI.js";import{S as m}from"./KandidatHendelseTag-s9EQi-CE.js";import{S as u}from"./Trash-Df_HNME-.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CLI_JLEl.js";import"./VStack-CReScaEF.js";import"./BasePrimitive-zryuTTx0.js";import"./Box-B2qmz5LI.js";import"./List-B87HwrzR.js";import"./Link-CsEgK7kv.js";import"./dato-G81G8qMd.js";import"./format-CYyuaQK7.js";import"./en-US-BqXGko0a.js";import"./match-Dbok1h-_.js";import"./parseISO-Cvidxtvo.js";import"./parse-CrR1rErE.js";import"./getDefaultOptions-Bv-K6pOf.js";import"./isSameDay-CsSUTsd2.js";import"./index-CpS90Pn7.js";import"./index-CWbL8d4M.js";import"./util-BO8HyK-f.js";import"./Modal.context-C4_R1QvZ.js";import"./Portal-B-_vJkTg.js";import"./useDescendant-B75UaI-D.js";import"./DismissableLayer-Dr9r_Rek.js";import"./Floating-4xvWMp_S.js";import"./useOpenChangeAnimationComplete-lm8vmVu4.js";import"./useValueAsRef-CFZUeLPj.js";import"./FocusBoundary-CY2h0hk1.js";import"./useControllableState-B7HGaoNK.js";import"./ChevronRight-DUT1TOCc.js";import"./Tag-DrKdKGXB.js";import"./ChatExclamationmark-BbDt_EiA.js";import"./FileXMark-BDqCBbSA.js";import"./HandShakeHeart-BFwKgg0m.js";import"./Calendar-bxhdXwoQ.js";import"./ThumbUp-C7owMO3M.js";import"./ExclamationmarkTriangle-CxMevtua.js";import"./Table-C2hgNYb0.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IHandlingMeny,o as SomKnapp,ee as default};
