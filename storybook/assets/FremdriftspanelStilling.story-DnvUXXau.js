import{aw as I,T as w,j as t,x as k,S as x,cz as j,cI as b,cH as g,cA as u,X as y,c$ as _}from"./iframe-_QUoCLzD.js";import{w as m,c as D}from"./ContextDecorators-BwvQntpq.js";import{F as N,A as v}from"./FullførtStilling-DRFQ5DiB.js";import{R as T}from"./GjenåpneStillingKnapp-DNlSwahP.js";import{T as A}from"./TilgangskontrollForInnhold-Coqqrx0c.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DdK6nfmU.js";import"./OrganisasjonsnummerAlert-BB2zgEoS.js";import"./VStack-B07rP7Ko.js";import"./BasePrimitive-BUOPj2J2.js";import"./List-BX43fcHL.js";import"./Link-CucnNpTx.js";import"./KandidatHendelseTag-BZMp1aBB.js";import"./Tag-DiQnittR.js";import"./ChatExclamationmark-XhXNcNES.js";import"./FileXMark-BU1NHFma.js";import"./Trash-090UAozJ.js";import"./HandShakeHeart-DF-h01jx.js";import"./Calendar-C1c_btA0.js";import"./ThumbUp-CJa7Cc5X.js";import"./ExclamationmarkTriangle-DEQ4Xwvt.js";import"./Table-CDD0Bsw0.js";import"./index-CktUPNRq.js";import"./index-B40KJ5b4.js";import"./util-C51HBXju.js";import"./DatoVelger-Cx00CAOM.js";import"./useDatepicker-DG-dq8M0.js";import"./useControllableState-wViw2aPt.js";import"./Modal-Csfh0IqP.js";import"./floating-ui.react-z-ORhGHN.js";import"./Date.Input-C4Dh5hB2.js";import"./useFormField-CPQ4YRRy.js";import"./ChevronDown-BzJpQY-A.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Y6xfv06t.js";import"./Modal.context-BHSwgPbI.js";import"./Popover-BR1-3buT.js";import"./DismissableLayer-h4ATGLsG.js";import"./startOfMonth-DiKUHsjr.js";import"./Select-BlMsCIgD.js";import"./endOfMonth-CT8ipOBG.js";import"./ArrowLeft-B1gS5cPA.js";import"./ArrowRight-DSYCtXIX.js";import"./isSameDay-7142iDy3.js";import"./Checkbox-4b1UT5Ql.js";import"./Fieldset-4q5-7-Np.js";import"./accordion-CfcqChbA.js";import"./index-uoY3JF-w.js";import"./index-Cs2bDyy_.js";import"./index-Bg41zH-e.js";import"./Box-B_LxU5eT.js";import"./Bell-CtoPO3uG.js";import"./PersonChat-DiP0cWw0.js";import"./Eye-_U10hpS6.js";import"./ProgressBar-DnazS2KF.js";import"./useLatestRef-DpvLue1j.js";import"./ShieldLock-Cg58sUEy.js";import"./PadlockLocked-78cxAipU.js";import"./EyeSlash-BKS2Rika.js";import"./CircleSlash-43RtETSQ.js";import"./Pencil-Big_f7jo.js";import"./FullførStillingModal-h-7jC1iw.js";import"./PersonbrukerTekst-BJGyt-Hv.js";import"./ClockDashed-gZ1sQcH-.js";import"./IkonNavnAvatar-CoCqRqXP.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-qcmjuCPC.js";import"./ErrorBoundary-BJPH3TRb.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
