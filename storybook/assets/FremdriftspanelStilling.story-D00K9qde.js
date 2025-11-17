import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-zbUhGjti.js";import{w as m,c as A}from"./ContextDecorators-D15_rS6s.js";import{F as N,A as v}from"./FullførtStilling-D-haHXcU.js";import{R as T}from"./GjenåpneStillingKnapp-DHosNSF0.js";import{T as E}from"./TilgangskontrollForInnhold-DcTI4TfI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-5NBrRUDf.js";import"./OrganisasjonsnummerAlert-DogTccR8.js";import"./VStack-D2-FbYL0.js";import"./BasePrimitive-ByXS3CFE.js";import"./List-BzV1npJX.js";import"./Link-BLN5eTSs.js";import"./KandidatHendelseTag-CNs8YCU9.js";import"./Tag-K6bQ2sjM.js";import"./ChatExclamationmark-taundlQq.js";import"./FileXMark-Cby3Ptey.js";import"./Trash-BSWeFA-4.js";import"./HandShakeHeart-Bzm2p_pH.js";import"./Calendar-BZYoQ7OQ.js";import"./ThumbUp-B-CUqlMN.js";import"./Table-DJHoi2oR.js";import"./util-Bw9VNyjs.js";import"./parse-D_RlzfMW.js";import"./getDefaultOptions-BQd4M5Gn.js";import"./parseISO-DpZcFrkX.js";import"./index-Dx1cgU1m.js";import"./index-B40KJ5b4.js";import"./isBefore-Cfsyz_OO.js";import"./util-Cuj27M8w.js";import"./accordion-pOGGiDdc.js";import"./index-tZmSVeXL.js";import"./index-Czz7KL-7.js";import"./index-CEXrdNW8.js";import"./ChevronDown-Di096zjX.js";import"./Box-pSen6ybk.js";import"./Bell-BVWF-fjA.js";import"./PersonChat-DH1g4ewe.js";import"./Eye-BHN__cB9.js";import"./ProgressBar-DV-2PloE.js";import"./EyeSlash-DPAFDIZ9.js";import"./CircleSlash-BXw6lQD3.js";import"./Modal-CN1dJgG6.js";import"./floating-ui.react-CORjjwzS.js";import"./Date.Input-D_14jgPo.js";import"./useFormField-DEptfI14.js";import"./useControllableState-9lWmz1GE.js";import"./Modal.context-BQceTvJ2.js";import"./Checkbox-B6tXY7hd.js";import"./Fieldset-Bgga2ppi.js";import"./Pencil-pHshiVWL.js";import"./PersonbrukerTekst-Dq8GXdo9.js";import"./ClockDashed-CeQfq_7e.js";import"./Tasklist-CQ0N9xv0.js";import"./ErrorBoundary-B4oVt2ZJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
