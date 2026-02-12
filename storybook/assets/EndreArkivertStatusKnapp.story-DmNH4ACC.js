import{j as e,h as d,r as p}from"./iframe-4a7pzBuS.js";import"./KandidatlisteContext-BD9_3RHd.js";import{A as i}from"./ActionMenu-BPt9PAMR.js";import{S as m}from"./KandidatHendelseTag-bjzEuH46.js";import{S as u}from"./Trash-bicb_nBB.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-8KB8IjJf.js";import"./VStack-DzcWggSF.js";import"./BasePrimitive-Bw-dE1Pc.js";import"./Box-CW0Z3SG9.js";import"./List-b8cW90yl.js";import"./Link-cXXLhatC.js";import"./index-Dqq5BLuM.js";import"./index-B40KJ5b4.js";import"./util-CyD_m1PQ.js";import"./Modal.context-DbZ7VQS-.js";import"./useControllableState-V8VzWG7k.js";import"./Portal-EKxViMk5.js";import"./useClientLayoutEffect-BogR7EgA.js";import"./FocusBoundary-BVpkcUZG.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-UAivRdhX.js";import"./useOpenChangeAnimationComplete-DB6K6zhi.js";import"./useDescendant-D59omdKy.js";import"./DismissableLayer-BEwNDouw.js";import"./Floating-Dqcb6Mqm.js";import"./ChevronRight-f9X_0osm.js";import"./Tag-D3S9-NkF.js";import"./ChatExclamationmark-CFFp_i8M.js";import"./FileXMark-_1-OnK4S.js";import"./HandShakeHeart-B7hLCJD-.js";import"./Calendar-CV40_lg4.js";import"./ThumbUp-D-yOKIPO.js";import"./ExclamationmarkTriangle-DAiqYGTZ.js";import"./Table-DkwYalXI.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,V as default};
