import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DZyrTSlI.js";import{w as m,c as D}from"./ContextDecorators-TmXvtnk-.js";import{F as N,A as v}from"./FullførtStilling-BgO2S5ja.js";import{R as T}from"./GjenåpneStillingKnapp-We8vQTzs.js";import{T as A}from"./TilgangskontrollForInnhold-bsgUoySH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BkAw1Mkr.js";import"./OrganisasjonsnummerAlert-fw0smuCn.js";import"./VStack-Bi3_lm1-.js";import"./BasePrimitive-DsapbUAH.js";import"./List-CypvTfcm.js";import"./Link-DpvyDfp9.js";import"./KandidatHendelseTag-DLqx-B6C.js";import"./Tag-DFzpGXaJ.js";import"./ChatExclamationmark-iuBP3eJo.js";import"./FileXMark-Bh_C5zZN.js";import"./Trash-BhVhLJs_.js";import"./HandShakeHeart-BC1s7_NO.js";import"./Calendar--tOITD5g.js";import"./ThumbUp-BO4EIKNS.js";import"./Table-B3zrRkWX.js";import"./util-D-Ql6dhl.js";import"./format-CxDBX73B.js";import"./match-Bhd-0bF1.js";import"./parse-DvmpoZJt.js";import"./getDefaultOptions-BnejP4zr.js";import"./parseISO-KPFOWa3j.js";import"./util-P4U7UwH7.js";import"./accordion-dI2G2Dlx.js";import"./index-wCe2QD6Y.js";import"./index-D2e2HLZf.js";import"./index-IE3QoAGL.js";import"./ChevronDown-CoI8HCn0.js";import"./Box-C5SzHthS.js";import"./Bell-BrUwOLId.js";import"./PersonChat-C4rHzVT2.js";import"./Eye-B-wlInBv.js";import"./ProgressBar-BdbVlqBc.js";import"./EyeSlash-C4HKtCGY.js";import"./CircleSlash-C_QNxvX-.js";import"./Modal-DGAQvmmn.js";import"./floating-ui.react-DdUQq2B3.js";import"./Date.Input-DYwhDOSj.js";import"./useFormField-P10hdtN7.js";import"./useControllableState-D5wZx8MS.js";import"./Modal.context-DtBDKmOm.js";import"./Checkbox-SQiPBzAX.js";import"./Fieldset-DssFue0n.js";import"./Pencil-BjUL-Vnc.js";import"./PersonbrukerTekst-D-xg_Sye.js";import"./ClockDashed-rjBmLAoK.js";import"./Tasklist-BZ82i7iV.js";import"./ErrorBoundary-ChTFdFnO.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
