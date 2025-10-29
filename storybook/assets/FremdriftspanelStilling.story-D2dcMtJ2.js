import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-CnM7RT4h.js";import{w as m,c as A}from"./ContextDecorators-BLW72MqT.js";import{F as N,A as v}from"./FullførtStilling-CfcV8IAF.js";import{R as T}from"./GjenåpneStillingKnapp-B36sgozr.js";import{T as D}from"./TilgangskontrollForInnhold-Di-Wni2r.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DyOfJxEG.js";import"./OrganisasjonsnummerAlert-CIyafJD8.js";import"./VStack-q_qdqDEK.js";import"./BasePrimitive-BcRt1gCV.js";import"./List-C38Qf_at.js";import"./Link-B4LcRRHa.js";import"./KandidatHendelseTag-mSc9II9L.js";import"./Tag-BGgcBDkO.js";import"./ChatExclamationmark-NytTTLa3.js";import"./FileXMark-DPgsERTd.js";import"./Trash-FsJZeVDl.js";import"./HandShakeHeart-BFpOtlHB.js";import"./Calendar-D9k6rPRi.js";import"./ThumbUp-C_2BI2ud.js";import"./Table-Dvx6_-ke.js";import"./util-BJ4TtLU-.js";import"./parse-DTRzWOAH.js";import"./getDefaultOptions-FxIfy1dz.js";import"./parseISO-Bt1F7znG.js";import"./index-r9hVGdVq.js";import"./index-B40KJ5b4.js";import"./isBefore-DmiPH2e_.js";import"./util-CEOuGiz7.js";import"./accordion-CAqZ065c.js";import"./index-wnEixSdW.js";import"./index-Bt74f-fa.js";import"./index-bbBtkuUu.js";import"./ChevronDown-DNt8Y1Vb.js";import"./Box-KSbBkdlM.js";import"./Bell-DwFkFqif.js";import"./PersonChat-DcO_NsOk.js";import"./Eye-zpi8t9TG.js";import"./ProgressBar-2Ad4Nwwx.js";import"./EyeSlash-DkzobAyE.js";import"./CircleSlash-3Zc_y9XY.js";import"./Modal-EGw49zjI.js";import"./floating-ui.react-pnL2__Kf.js";import"./Date.Input-ZulnjPi4.js";import"./useFormField-DKGrE0Rs.js";import"./useControllableState-Cn-1utpz.js";import"./Modal.context-vVkaDHEy.js";import"./Checkbox-DMHXfjoN.js";import"./Fieldset-B5PsV_Z0.js";import"./Pencil-lkf01aDR.js";import"./PersonbrukerTekst-B7jvlnju.js";import"./ClockDashed-Dc2RA4NP.js";import"./Tasklist-DMdYkaO8.js";import"./ErrorBoundary-DZiFV32t.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
