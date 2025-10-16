import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cr as b,aG as g,co as u,aP as y,cD as _}from"./iframe-DomB5bjj.js";import{w as d,c as A}from"./ContextDecorators-CbbMJfiQ.js";import{F as N,A as v}from"./FullførtStilling-DLqLXmeC.js";import{R as T}from"./GjenåpneStillingKnapp-BOGD5Z14.js";import{T as D}from"./TilgangskontrollForInnhold-T8mfZIJC.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Un_AZNHM.js";import"./OrganisasjonsnummerAlert-Cx4V2j_h.js";import"./VStack-BIZJXBtz.js";import"./BasePrimitive-4zkMH27C.js";import"./List-Db0gO-es.js";import"./Link-BjAiGgN5.js";import"./KandidatHendelseTag-Bda8LXPK.js";import"./Tag-p63y2drH.js";import"./FileXMark-eMar8Um1.js";import"./Trash-DJRsp79v.js";import"./HandShakeHeart-KQIWCk1D.js";import"./Calendar-B4MnxOld.js";import"./ThumbUp-Bsw1Krcb.js";import"./Table-CzQYNK6w.js";import"./util-BrcKzcyk.js";import"./format-B6xbGTNx.js";import"./match-wFH0aIAd.js";import"./parseISO-ve8k0lUo.js";import"./parse-BoX7ZchI.js";import"./getDefaultOptions-CvH2z-S0.js";import"./util-CiK02jJ7.js";import"./accordion-mLhJzwpD.js";import"./index-CKvBa7GS.js";import"./index-qE1I5tpB.js";import"./index-BRhwxFqg.js";import"./ChevronDown-cMXOGJdx.js";import"./Box-C4II_v45.js";import"./Bell-Dr28xTO6.js";import"./PersonChat-7WucLlQ1.js";import"./Eye-B8mjXYR8.js";import"./ProgressBar-O9i8Rle2.js";import"./EyeSlash-C3ID64pe.js";import"./CircleSlash-DGtwOUcA.js";import"./Modal-Dhc5REPS.js";import"./floating-ui.react-KIjMCIJQ.js";import"./Date.Input-VTW74Tam.js";import"./useFormField-DeAjfiw7.js";import"./useControllableState-8E3oNcN9.js";import"./Modal.context-B4LbjCDK.js";import"./Checkbox-bfd6nrEy.js";import"./Fieldset-BgFd_o9H.js";import"./Pencil-Cm1ReCEt.js";import"./PersonbrukerTekst-Bpo8BtJA.js";import"./ClockDashed-BSGq7MxT.js";import"./Tasklist-CmPfq5E0.js";import"./ErrorBoundary-BVnygA6j.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
