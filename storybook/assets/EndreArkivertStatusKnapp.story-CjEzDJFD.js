import{j as e,a as d,r as p}from"./iframe-Clr6_eiR.js";import"./KandidatlisteContext-C8HhexAH.js";import{A as i}from"./ActionMenu-DzqgztY8.js";import{S as m}from"./KandidatHendelseTag-i-E-ISRt.js";import{S as u}from"./Trash-sBr1pDGc.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DO7LUPOp.js";import"./VStack-CPx6I1hW.js";import"./BasePrimitive-CxRpgxE9.js";import"./Box-SVuIPcF3.js";import"./List-CtEOe7Hr.js";import"./Link-gfPk5w1O.js";import"./dato-XZ6L-0PL.js";import"./format-CBz984WZ.js";import"./en-US-DqCJgRqo.js";import"./match-DybUA87c.js";import"./parseISO-CtQ5RE6R.js";import"./parse-C6dx_wHF.js";import"./getDefaultOptions-CTp-PeE4.js";import"./isSameDay-BPFxric3.js";import"./index-DZl7TAVY.js";import"./index-CWbL8d4M.js";import"./util-B2S2G6ZN.js";import"./Modal.context-D3d_p7y-.js";import"./Portal-Dequ70rE.js";import"./useDescendant-BHw7ZzOX.js";import"./DismissableLayer-CSQxb-ww.js";import"./Floating-ClkLr2Kc.js";import"./useOpenChangeAnimationComplete-W1jsdV_P.js";import"./useValueAsRef-CzSN2VAC.js";import"./FocusBoundary-BVY7k8Rf.js";import"./useControllableState-COWj_ZN-.js";import"./ChevronRight-CTumDOUp.js";import"./Tag-DR5-8C-T.js";import"./ChatExclamationmark-BUh9bjuX.js";import"./FileXMark-CdDeP6if.js";import"./HandShakeHeart-BlpbBj5N.js";import"./Calendar-Cih3J-RN.js";import"./ThumbUp-_O2hsjnq.js";import"./ExclamationmarkTriangle--Nxi2gUP.js";import"./Table-CwK8tj6h.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
