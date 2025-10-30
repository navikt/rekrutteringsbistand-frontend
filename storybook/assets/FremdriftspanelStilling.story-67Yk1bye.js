import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-DenWKEC9.js";import{w as m,c as A}from"./ContextDecorators-Zba6gbmz.js";import{F as N,A as v}from"./FullførtStilling-DycFVoeN.js";import{R as T}from"./GjenåpneStillingKnapp-BXJs4c2S.js";import{T as D}from"./TilgangskontrollForInnhold-DwDPH0EU.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CsKBS0BO.js";import"./OrganisasjonsnummerAlert-obK7_QDf.js";import"./VStack-CgG0_7Bf.js";import"./BasePrimitive-CFAu65JT.js";import"./List-kTGH93FM.js";import"./Link-DfNt57rx.js";import"./KandidatHendelseTag-B9pLql8l.js";import"./Tag-mXhf_Gx6.js";import"./ChatExclamationmark-cMbkJjdc.js";import"./FileXMark-Bh_6TLBp.js";import"./Trash-B6zj5MlH.js";import"./HandShakeHeart-CPY-QxOG.js";import"./Calendar-Be4J78HH.js";import"./ThumbUp-ehS7sMwt.js";import"./Table-CiBZ0HtF.js";import"./util-vHg8_hOB.js";import"./parse-DZwGwjot.js";import"./getDefaultOptions-DeORvD4A.js";import"./parseISO-BVrL3Abg.js";import"./index-CFn0OksF.js";import"./index-B40KJ5b4.js";import"./isBefore-BBZToDFP.js";import"./util-BGPb1UJH.js";import"./accordion-C7iNKo1a.js";import"./index-BKBlnMM_.js";import"./index-B4_dCnWh.js";import"./index-CNQsj9GD.js";import"./ChevronDown-Db1AikAf.js";import"./Box-BBIqipjE.js";import"./Bell-CQqg-0zz.js";import"./PersonChat-BE1jRUHk.js";import"./Eye-DE-wml8Y.js";import"./ProgressBar-VkwUtOld.js";import"./EyeSlash-DmFsoqyi.js";import"./CircleSlash-DunIrLsQ.js";import"./Modal-TwqKa51N.js";import"./floating-ui.react-C8po_Knd.js";import"./Date.Input-DPKg9Xc0.js";import"./useFormField-CQ6rQeaw.js";import"./useControllableState-DjghFc1P.js";import"./Modal.context-Dz6HeStX.js";import"./Checkbox-CX_MDIKX.js";import"./Fieldset-CfetQI6X.js";import"./Pencil-CgFugyv-.js";import"./PersonbrukerTekst-BMG5PzpV.js";import"./ClockDashed-D0LB19nb.js";import"./Tasklist-2ANtWYJF.js";import"./ErrorBoundary-D9ANYV_j.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
