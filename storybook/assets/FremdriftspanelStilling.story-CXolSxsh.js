import{aw as w,U as I,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-BA8lGxgc.js";import{w as m,c as A}from"./ContextDecorators-BnDH9sr3.js";import{F as N,A as v}from"./FullførtStilling-TjIN9Hr-.js";import{R as T}from"./GjenåpneStillingKnapp-VJeAMBuw.js";import{T as E}from"./TilgangskontrollForInnhold-CXd-ACCl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-xIeaODv6.js";import"./OrganisasjonsnummerAlert-2VNoVFHS.js";import"./VStack-DqzLThnb.js";import"./BasePrimitive-CzcpJyoT.js";import"./List-D5E-FGmL.js";import"./Link-DeXU7FXb.js";import"./KandidatHendelseTag-BcjMiIdK.js";import"./Tag-CYMsqiOQ.js";import"./ChatExclamationmark-B6cQYi_k.js";import"./FileXMark-BAgWfogE.js";import"./Trash-C1yt_cag.js";import"./HandShakeHeart-DZhiV6m5.js";import"./Calendar-CwN-hPGG.js";import"./ThumbUp-BAiA4eiW.js";import"./Table-CqBmIssP.js";import"./index-Bx4qJFrm.js";import"./index-B40KJ5b4.js";import"./util-Cu4x6vVJ.js";import"./DatoVelger-D9kNvln9.js";import"./useDatepicker-BQDpRfrh.js";import"./useControllableState-sTcONFh0.js";import"./Modal-FL_hfnIr.js";import"./floating-ui.react-oXij7_b1.js";import"./Date.Input-DD4Kcipt.js";import"./useFormField-DmljyEKY.js";import"./ChevronDown-BTdMiVCP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CGYyINhG.js";import"./Modal.context-B3p26qHn.js";import"./Popover-EC24xk5G.js";import"./DismissableLayer-Cs8olJS3.js";import"./startOfMonth-CcK6EjBf.js";import"./Select-Dpi3Anwx.js";import"./endOfMonth-lsheaomw.js";import"./ArrowLeft-CsEgLVVn.js";import"./ArrowRight-BMOPsR71.js";import"./isSameDay-FEAd8yGs.js";import"./Checkbox-B9raoTa8.js";import"./Fieldset-DYbCyGlA.js";import"./accordion-C25oZWUL.js";import"./index-CmhQLiLX.js";import"./index-Be--AgyT.js";import"./index-CRX0EupI.js";import"./Box-BxtLu52g.js";import"./Bell-UKMHYabT.js";import"./PersonChat-CNIvwipg.js";import"./Eye-CJJv2p5U.js";import"./ProgressBar-Bf-_leiA.js";import"./useLatestRef-0RizkFOC.js";import"./EyeSlash-DyOa_Uap.js";import"./CircleSlash-ocsVngus.js";import"./Pencil-CdLSCBUn.js";import"./FullførStillingModal-DiI1wofv.js";import"./PersonbrukerTekst-BxB6E9IS.js";import"./ClockDashed-DTYcIv43.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-CnyE4Khw.js";import"./ErrorBoundary-2NcsSfiK.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=w(),d=I(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
