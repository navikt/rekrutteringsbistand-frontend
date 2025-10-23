import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-BUTH-F7i.js";import{w as m,c as D}from"./ContextDecorators-DE0KaYM-.js";import{F as N,A as v}from"./FullførtStilling-CghzCHQ_.js";import{R as T}from"./GjenåpneStillingKnapp-DvxL0eDB.js";import{T as A}from"./TilgangskontrollForInnhold-DXm2ifUQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CCAP6VOk.js";import"./OrganisasjonsnummerAlert-CUE_z-nH.js";import"./VStack-Cfx8ef2d.js";import"./BasePrimitive-EN-WoeUf.js";import"./List-Bm6jGDlf.js";import"./Link-BOqk8eTY.js";import"./KandidatHendelseTag-DfgMw4Jd.js";import"./Tag-DgvxzQaa.js";import"./ChatExclamationmark-DMHFFO4S.js";import"./FileXMark-BK_pna-N.js";import"./Trash-vUHcf7iv.js";import"./HandShakeHeart-BNG4Il0b.js";import"./Calendar-CzmNfA2J.js";import"./ThumbUp-DtK_UsEP.js";import"./Table-vOpy5atD.js";import"./util-BCy7N5Yk.js";import"./format-Crxdz2N3.js";import"./match-uqK75o6n.js";import"./parse-amrLoI_k.js";import"./getDefaultOptions-CvOEeqG0.js";import"./parseISO-CcfrR_FE.js";import"./util-BAjIrB6Q.js";import"./accordion-BNfc7vPF.js";import"./index-CmrXfqxN.js";import"./index-BvhL-f9Z.js";import"./index-yMIpIYuj.js";import"./ChevronDown-DEWO2onA.js";import"./Box-DePjC3z7.js";import"./Bell-DOXUZ9JT.js";import"./PersonChat-CBTBt9KC.js";import"./Eye-Dhis_s2x.js";import"./ProgressBar-DiQ-gCUI.js";import"./EyeSlash-DSFmSfky.js";import"./CircleSlash-DQ5VL5d-.js";import"./Modal-DDc7-OJ6.js";import"./floating-ui.react-vZDWLZdq.js";import"./Date.Input-WHM_GH4n.js";import"./useFormField-DI3O8FlQ.js";import"./useControllableState-O207w7G8.js";import"./Modal.context-Blu6qJf4.js";import"./Checkbox-2sUcVh4w.js";import"./Fieldset-C5nxa5vj.js";import"./Pencil-BwmCedzu.js";import"./PersonbrukerTekst-DG0u6AJH.js";import"./ClockDashed-DTYDopRs.js";import"./Tasklist-BTnTKJit.js";import"./ErrorBoundary-BN4xPhVU.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
