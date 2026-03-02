import{j as e,c as d,r as p}from"./iframe-E6Mm1JGe.js";import"./KandidatlisteContext-YwxKUbfx.js";import{A as i}from"./ActionMenu-97lolVZ6.js";import{S as m}from"./KandidatHendelseTag-DPu_rBEg.js";import{S as u}from"./Trash-DgvesoRa.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-v1sRG-Ae.js";import"./VStack-DcyqGAQ6.js";import"./BasePrimitive-DSSGc3uz.js";import"./Box-B24JeZZA.js";import"./List-BJszKEWq.js";import"./Link-B3qaX96X.js";import"./index-D74NftQi.js";import"./index-CWbL8d4M.js";import"./util-CUQMCRY3.js";import"./Modal.context-BPi-odSy.js";import"./Portal-BdF9mHc8.js";import"./useDescendant-BMHVH1hS.js";import"./DismissableLayer-BTPBSXh8.js";import"./Floating-CXoBKfyC.js";import"./useOpenChangeAnimationComplete-DBgL123z.js";import"./useValueAsRef-BGGjg3XW.js";import"./FocusBoundary-X71lrh3e.js";import"./useControllableState-D5-hTvpA.js";import"./ChevronRight-Calttabz.js";import"./Tag-GViw5sio.js";import"./ChatExclamationmark-_eF-En7c.js";import"./FileXMark-C2RZh6OQ.js";import"./HandShakeHeart-BUaZDdK4.js";import"./Calendar-CCtlhJLK.js";import"./ThumbUp-PGXrQLD7.js";import"./ExclamationmarkTriangle-DM0VKza-.js";import"./Table-Da-H00QW.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
