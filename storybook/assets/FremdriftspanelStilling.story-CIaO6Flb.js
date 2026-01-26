import{az as I,I as w,j as t,R as k,S as x,cx as j,cG as b,cF as g,cy as u,N as y,cZ as N}from"./iframe-DLcFPOQU.js";import{w as m,c as D}from"./ContextDecorators-DeCFFCPk.js";import{F as _,A as v}from"./FullførtStilling-DAV6Dfpp.js";import{R as T}from"./GjenåpneStillingKnapp-BNfNG3ON.js";import{T as A}from"./TilgangskontrollForInnhold-B8nShk-L.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DOCnuYM1.js";import"./OrganisasjonsnummerAlert-BeegMXwe.js";import"./VStack-WlCR9Jmi.js";import"./BasePrimitive-D2jpHuoC.js";import"./Box-DVzxHLWM.js";import"./List-D0BKDGOo.js";import"./Link-CAMq_i6s.js";import"./KandidatHendelseTag-BiqlCmrf.js";import"./Tag-cr-amcGI.js";import"./ChatExclamationmark-CNWMMC5w.js";import"./FileXMark-CI6cgFU2.js";import"./Trash-4_6yTjs7.js";import"./HandShakeHeart-DTPUZIKy.js";import"./Calendar-C6Zg2cWW.js";import"./ThumbUp-BXZGtsXc.js";import"./Table-DBHMMNrv.js";import"./index-DpMfSoWt.js";import"./index-B40KJ5b4.js";import"./util-CY7Z07jd.js";import"./DatoVelger-CPkXdGJm.js";import"./useDatepicker-CYrsFyGk.js";import"./useControllableState-klXAuQpk.js";import"./Modal-C2Cl2qrx.js";import"./floating-ui.react-yTmGsUf2.js";import"./useFormField-ByT3rDr1.js";import"./ReadMore-ce-gQrKG.js";import"./ChevronDown-DjYatFtJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C8cW1GFx.js";import"./Modal.context-DE-XYzXq.js";import"./Popover-BRPonoUr.js";import"./DismissableLayer-CFcBKd-R.js";import"./startOfMonth-DZtmffDS.js";import"./Select-CN_wkI7S.js";import"./endOfMonth-RcsncA9z.js";import"./ArrowLeft-BtDgdKYT.js";import"./ArrowRight--R-OGIa9.js";import"./isSameDay-B42lZvzr.js";import"./Checkbox-eTs3wbqp.js";import"./Fieldset-B__4qH0E.js";import"./accordion-CI3J-up_.js";import"./index-BDeNiXAi.js";import"./index-B_6epR84.js";import"./index-CIoUG16N.js";import"./ProgressBar-CcWx96Wt.js";import"./useValueAsRef-BSJ7xw7j.js";import"./Bell-DT1-Ww-F.js";import"./PersonChat-Dbh14l0V.js";import"./Eye-DWj0wWb-.js";import"./ShieldLock-C4fw3uKY.js";import"./PadlockLocked-WEV6NrL5.js";import"./EyeSlash-DjTvKMdi.js";import"./CircleSlash-Tz5e5tN1.js";import"./Pencil-C1we882K.js";import"./FullførStillingModal-BUED__XZ.js";import"./PersonbrukerTekst-3mu1xec-.js";import"./ClockDashed-DUZ1xdio.js";import"./IkonNavnAvatar-Cv6ssmUr.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BINebbAb.js";import"./ErrorBoundary-y4s6tghg.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
