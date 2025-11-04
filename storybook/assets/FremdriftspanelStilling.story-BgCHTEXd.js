import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-ByNpXw81.js";import{w as m,c as A}from"./ContextDecorators-Olm2YFmo.js";import{F as N,A as v}from"./FullførtStilling-DLRqf4ED.js";import{R as T}from"./GjenåpneStillingKnapp-D8dZCUIO.js";import{T as D}from"./TilgangskontrollForInnhold-JU9hgS-L.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C-adtj-6.js";import"./OrganisasjonsnummerAlert-CgoWqrfn.js";import"./VStack-BkCe9z3a.js";import"./BasePrimitive-CgEC5yfj.js";import"./List-C0CGx6t_.js";import"./Link-K7iHMQmO.js";import"./KandidatHendelseTag-BDLVCQQX.js";import"./Tag-BIhHedAj.js";import"./ChatExclamationmark-D8oH4723.js";import"./FileXMark-CWKNfRsF.js";import"./Trash-BSgz52q-.js";import"./HandShakeHeart-f3HbAaro.js";import"./Calendar-Cudjsd_l.js";import"./ThumbUp-B2DxAcQQ.js";import"./Table-CRfVQTev.js";import"./util-ChU84pnD.js";import"./parse-CqHOPKoV.js";import"./getDefaultOptions-BH8bkUTA.js";import"./parseISO-upBYiumH.js";import"./index-D3yaVyU9.js";import"./index-B40KJ5b4.js";import"./isBefore-D2MnlS4x.js";import"./util-esJN40y8.js";import"./accordion-B90-Ue0H.js";import"./index-CtEcxs_Y.js";import"./index-48ObrcQA.js";import"./index-2xACD2cv.js";import"./ChevronDown-CuGLSyjk.js";import"./Box-DDwCEUZs.js";import"./Bell-CPB3nIQB.js";import"./PersonChat-gFchLqL4.js";import"./Eye-FjJux3vS.js";import"./ProgressBar-ZVC6P7Cb.js";import"./EyeSlash-xNW_9HoX.js";import"./CircleSlash-B0EDyoGB.js";import"./Modal-D2Nut8bL.js";import"./floating-ui.react-BxBUTSmx.js";import"./Date.Input-Aio1NogG.js";import"./useFormField-BWbpbANY.js";import"./useControllableState-CF148P0b.js";import"./Modal.context-D5msxr56.js";import"./Checkbox-Dptbjfkb.js";import"./Fieldset-skYrXRlK.js";import"./Pencil-6M81j-k-.js";import"./PersonbrukerTekst-BwSdIwyT.js";import"./ClockDashed-trVfCWU3.js";import"./Tasklist-DEEx2zPw.js";import"./ErrorBoundary-CvZmrXnc.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
