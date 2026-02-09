import{aw as I,I as w,j as t,R as k,S as j,cu as x,cD as b,cC as g,cv as u,N as y,cW as N}from"./iframe-SGs9n5AY.js";import{w as m,c as A}from"./ContextDecorators-D847BpTw.js";import{F as _,A as v}from"./FullførtStilling-CmPheiBM.js";import{R as T}from"./GjenåpneStillingKnapp-DE_jsjoA.js";import{T as D}from"./TilgangskontrollForInnhold-CtEEaD2O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CSR3K4NQ.js";import"./OrganisasjonsnummerAlert-CCXd5l36.js";import"./VStack-DVblRpQg.js";import"./BasePrimitive-DhMYuIXn.js";import"./Box-Cbnrm5kp.js";import"./List-z0o5hgu8.js";import"./Link-BN-rLTot.js";import"./KandidatHendelseTag-lnlzUuNp.js";import"./Tag-d0gHNfmq.js";import"./ChatExclamationmark-BqsYhffn.js";import"./FileXMark-D89fD8rJ.js";import"./Trash-BHgd6Yc7.js";import"./HandShakeHeart-DIjNO2Ne.js";import"./Calendar-BwVmCUoI.js";import"./ThumbUp-G0OPQQAC.js";import"./ExclamationmarkTriangle-Cj_6dZL1.js";import"./Table-BhNtlHIL.js";import"./index-CbUQqlOu.js";import"./index-B40KJ5b4.js";import"./util-Ae9jxT6g.js";import"./DatoVelger-1LgQmeF3.js";import"./useDatepicker-C6JMzp0b.js";import"./useControllableState-B3K6rjpl.js";import"./Modal-Cpk95CYw.js";import"./floating-ui.react-_myRbqhk.js";import"./useFormField-BhN1Jddn.js";import"./ReadMore-CX_u8uTc.js";import"./ChevronDown-B7kNYBc6.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B_bLdoEO.js";import"./Modal.context-BKWfvGQj.js";import"./Popover-CRHxe-Ds.js";import"./DismissableLayer-qvel5ih6.js";import"./startOfMonth-BywWOu-6.js";import"./Select-CO_6Qzc-.js";import"./endOfMonth-Coh3yap4.js";import"./ArrowLeft-_d3Sd_6b.js";import"./ArrowRight-DD4OmOHp.js";import"./isSameDay-BM2EDDsV.js";import"./Checkbox-ByR9G72o.js";import"./Fieldset-DV6rEbp-.js";import"./accordion-B5VpSAAt.js";import"./index--2fDOrqo.js";import"./index-T4OpN4hW.js";import"./index-CD59J11C.js";import"./ProgressBar-DEX4DoTF.js";import"./useValueAsRef-CTyKq8r-.js";import"./Bell-Jc3lsxYA.js";import"./PersonChat-DH-Ab2f1.js";import"./Eye-DvGcU7uP.js";import"./ShieldLock-CkYe-Jdd.js";import"./PadlockLocked-Bb70osoS.js";import"./EyeSlash-Ba8UaWnZ.js";import"./CircleSlash-L7jkpvt2.js";import"./Pencil-BdVWVAmb.js";import"./FullførStillingModal-xARo_4eF.js";import"./PersonbrukerTekst-C49sku8n.js";import"./ClockDashed-y3kIhFlq.js";import"./IkonNavnAvatar-CSiISdeb.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-IkLt6gOk.js";import"./ErrorBoundary-RKnwq_Sx.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
