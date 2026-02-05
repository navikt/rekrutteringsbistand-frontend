import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-8PA8JIpM.js";import{w as m,c as D}from"./ContextDecorators-693wbuSs.js";import{F as _,A as v}from"./FullførtStilling-WY5S3oKg.js";import{R as T}from"./GjenåpneStillingKnapp-JjB5iSG1.js";import{T as A}from"./TilgangskontrollForInnhold-a7v6Uk_7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DjDIdn6k.js";import"./OrganisasjonsnummerAlert-BF-uqVZd.js";import"./VStack-C5TklDBs.js";import"./BasePrimitive-CS6dP3kN.js";import"./Box-lNhXOLcS.js";import"./List-L5kmjqNb.js";import"./Link-DwOhcXtK.js";import"./KandidatHendelseTag-D1-JW3PQ.js";import"./Tag-DdN6yDgJ.js";import"./ChatExclamationmark-C76uizCL.js";import"./FileXMark-DW8LQ00M.js";import"./Trash-CsbrXyGo.js";import"./HandShakeHeart-BeW9pxc7.js";import"./Calendar-CiGgD1Wd.js";import"./ThumbUp-CyJ_juv6.js";import"./ExclamationmarkTriangle-U8KhXais.js";import"./Table-BnGeDy7b.js";import"./index-CP1sWLEr.js";import"./index-B40KJ5b4.js";import"./util-Qt-ynxAK.js";import"./DatoVelger-YKzUpu64.js";import"./useDatepicker-vVmg1MCq.js";import"./useControllableState-BO1oWSXl.js";import"./Modal-5nBSo7Ni.js";import"./floating-ui.react-DA3NzabH.js";import"./useFormField-BW1aEeVF.js";import"./ReadMore-FzzSl8EK.js";import"./ChevronDown-aDL9GrOY.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BuANfnd3.js";import"./Modal.context-D15DMEGj.js";import"./Popover-B0-KeiIa.js";import"./DismissableLayer-D5QKxWcX.js";import"./startOfMonth-aYAIuzwb.js";import"./Select-Bkb0nKsG.js";import"./endOfMonth-F1Ll8f3a.js";import"./ArrowLeft-n8OFWinq.js";import"./ArrowRight-BHShUfsR.js";import"./isSameDay-B_8HN7l4.js";import"./Checkbox-D2dqimeE.js";import"./Fieldset-CQJ--Qrh.js";import"./accordion-D2uL80h1.js";import"./index-UgXxFkyH.js";import"./index-B44otJIP.js";import"./index-DuZM5NrW.js";import"./ProgressBar-Dsb9JOnM.js";import"./useValueAsRef-DJD3ZnQY.js";import"./Bell-hK-DxhPd.js";import"./PersonChat-Q6AFZMlx.js";import"./Eye-C7RAgRt9.js";import"./ShieldLock-Ds89jIFy.js";import"./PadlockLocked-fXv6WB_n.js";import"./EyeSlash-BWgkfvyY.js";import"./CircleSlash-C8qKVGTO.js";import"./Pencil-lIymkSgC.js";import"./FullførStillingModal-BEJBeXjQ.js";import"./PersonbrukerTekst-DGGiCt-Q.js";import"./ClockDashed-5-_wLzYP.js";import"./IkonNavnAvatar-CQuRG_wv.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BJlp7uvH.js";import"./ErrorBoundary-C1RHTyxh.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
