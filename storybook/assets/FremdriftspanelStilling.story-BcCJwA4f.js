import{aw as I,I as w,j as t,R as k,S as j,cu as x,cD as b,cC as g,cv as u,N as y,cW as N}from"./iframe-eUZc9IfG.js";import{w as m,c as A}from"./ContextDecorators-BWdSNcLB.js";import{F as _,A as v}from"./FullførtStilling-lcwKX8Jy.js";import{R as T}from"./GjenåpneStillingKnapp-CKEZYmhS.js";import{T as D}from"./TilgangskontrollForInnhold-D-iSj89v.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BaofHeHy.js";import"./OrganisasjonsnummerAlert-CLVHW0AS.js";import"./VStack-D2Q4wvGm.js";import"./BasePrimitive-BRb4WXsy.js";import"./Box-DdDP5BvY.js";import"./List-ywpDV0pm.js";import"./Link-DQzGJyIQ.js";import"./KandidatHendelseTag-BNbvxaRH.js";import"./Tag-AwytiWVx.js";import"./ChatExclamationmark-99GpV8ND.js";import"./FileXMark-DgKNeLBr.js";import"./Trash-9L1LQghJ.js";import"./HandShakeHeart-i_x7RuNX.js";import"./Calendar-B-bYWFjj.js";import"./ThumbUp-URkaQQLm.js";import"./ExclamationmarkTriangle-BYGexLrb.js";import"./Table-Cb0Zq12V.js";import"./index-DgdLY_0B.js";import"./index-B40KJ5b4.js";import"./util-DuNLAiOk.js";import"./DatoVelger-C_4kp7da.js";import"./useDatepicker-Cw4W5bJb.js";import"./useControllableState-Becg88hF.js";import"./Modal-8rEatQJm.js";import"./floating-ui.react-BUuraGRi.js";import"./useFormField-CN7RQPDC.js";import"./ReadMore-O--1zaa4.js";import"./ChevronDown-BvEmE2ly.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BJpTkOfa.js";import"./Modal.context-BIF9Tjeq.js";import"./Popover-DLvT34V-.js";import"./DismissableLayer-BJaKTL7j.js";import"./startOfMonth-CLxR7Z8a.js";import"./Select-6Dz5tvXt.js";import"./endOfMonth-DtpCeQkI.js";import"./ArrowLeft-B2fU1CEX.js";import"./ArrowRight-DFoP_IQ5.js";import"./isSameDay-CszDv7vN.js";import"./Checkbox-ZPQVtvRW.js";import"./Fieldset-CPPl1Kjr.js";import"./accordion-Ba-nvuOU.js";import"./index-XJYoM08U.js";import"./index-WAmIWifQ.js";import"./index-CbtoIxLi.js";import"./ProgressBar-DPihrVI-.js";import"./useValueAsRef-BIBmpn5w.js";import"./Bell--2dWETbu.js";import"./PersonChat-1cbDqs3Y.js";import"./Eye-D2nVSy0s.js";import"./ShieldLock-Bg3Wkcre.js";import"./PadlockLocked-Cz81ByMu.js";import"./EyeSlash-BRlR9Rwk.js";import"./CircleSlash-D7GlXwHI.js";import"./Pencil-D0dRG9Xb.js";import"./FullførStillingModal-BC-sROlx.js";import"./PersonbrukerTekst-BS0JJT3M.js";import"./ClockDashed-CnegXM_w.js";import"./IkonNavnAvatar-BRZchJC4.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CjFH7nrs.js";import"./ErrorBoundary-e4W79MP8.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
