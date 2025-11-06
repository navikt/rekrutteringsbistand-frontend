import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-DxFO8IvB.js";import{w as m,c as E}from"./ContextDecorators-5dLdHQ6D.js";import{F as N,A as v}from"./FullførtStilling-By8MCp4R.js";import{R as T}from"./GjenåpneStillingKnapp-Bnqhb2Ck.js";import{T as D}from"./TilgangskontrollForInnhold-C4E_X5m2.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bx5Bh9AX.js";import"./OrganisasjonsnummerAlert-CUceEugp.js";import"./VStack-qaCCDpee.js";import"./BasePrimitive-BaqMTUpz.js";import"./List-DVvtlFCQ.js";import"./Link-DwpzwPgp.js";import"./KandidatHendelseTag-DBW4uWwr.js";import"./Tag-DQBZdq-6.js";import"./ChatExclamationmark-Ci7EBtJP.js";import"./FileXMark-COvzPyrZ.js";import"./Trash-DoeLRnir.js";import"./HandShakeHeart-l_VS9-hh.js";import"./Calendar-DV_dxZU5.js";import"./ThumbUp-CW_SQ9lV.js";import"./Table-CdzJnmri.js";import"./util-DZ3qgcJo.js";import"./parse-Dky1ezAl.js";import"./getDefaultOptions-Fdz5HjLp.js";import"./parseISO-DIXD6R6r.js";import"./index-H2AEdEPn.js";import"./index-B40KJ5b4.js";import"./isBefore-DAtEqNzd.js";import"./util-DMAiq0PX.js";import"./accordion-31F3WjHZ.js";import"./index-Dv8QlDqw.js";import"./index-rPouYUTS.js";import"./index-pP-DjFa1.js";import"./ChevronDown-DYWOWGBT.js";import"./Box-gRg756Qq.js";import"./Bell-D8Czy_HZ.js";import"./PersonChat-CvP_4Qzr.js";import"./Eye-nNs9sr7j.js";import"./ProgressBar-Dfb7W-cq.js";import"./EyeSlash-DBZAlvaS.js";import"./CircleSlash-C84pm2Zu.js";import"./Modal-D7Ivt0rL.js";import"./floating-ui.react-BGSAD5qD.js";import"./Date.Input-CIMNl_9q.js";import"./useFormField-BSkyo7ru.js";import"./useControllableState-CPx_uKRc.js";import"./Modal.context-zx_c4c0w.js";import"./Checkbox-G1_dLv34.js";import"./Fieldset-CcDNxI8Q.js";import"./Pencil-CDlgidVo.js";import"./PersonbrukerTekst-Dk4iguL_.js";import"./ClockDashed-Bqtk5jfs.js";import"./Tasklist-DTJVIK-4.js";import"./ErrorBoundary-BDwogjHh.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
