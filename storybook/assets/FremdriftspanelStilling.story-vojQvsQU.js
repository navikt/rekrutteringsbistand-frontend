import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-7eHG5h_U.js";import{w as d,c as D}from"./ContextDecorators-U54iRWbW.js";import{F as N,A as v}from"./FullførtStilling-CaZsajsP.js";import{R as T}from"./GjenåpneStillingKnapp-ITrfH4JC.js";import{T as A}from"./TilgangskontrollForInnhold-C0zM-_7T.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnG2yZZF.js";import"./OrganisasjonsnummerAlert-yxmlgvWb.js";import"./VStack-Bn24QnTO.js";import"./BasePrimitive-_gW3khcb.js";import"./List-CU38lByH.js";import"./Link-nxBccCCM.js";import"./KandidatHendelseTag-DqvuH8sL.js";import"./Tag-CCAZ-Ukh.js";import"./FileXMark-MhiY1pg_.js";import"./Trash-g2QxdwJW.js";import"./HandShakeHeart-CHdc252e.js";import"./Calendar-BLomWIBv.js";import"./ThumbUp-FdCUfIUT.js";import"./Table-ITv2gwZr.js";import"./util-C9Af0tKE.js";import"./format-B6AGnuRA.js";import"./match-ZJSMZWUP.js";import"./parseISO-DqOfLv4e.js";import"./parse-CKYxhVP8.js";import"./getDefaultOptions-hi6Mw6xh.js";import"./util-B-tfxij0.js";import"./accordion-CsRl1Yol.js";import"./index-B8Y3tdbo.js";import"./index-nc9kRxot.js";import"./index-Cpxv-Km5.js";import"./ChevronDown-0ue-sR1C.js";import"./Box-Dcy4IZnY.js";import"./Bell-QhB2yqh4.js";import"./PersonChat-BCbHdaPC.js";import"./Eye-BEBsO8JY.js";import"./ProgressBar-wpBLDayV.js";import"./EyeSlash-CJ3786Ay.js";import"./CircleSlash-DbaSe04T.js";import"./Modal-C0Fdt4rX.js";import"./floating-ui.react-DZKdw4va.js";import"./Date.Input-DUSVmfk7.js";import"./useFormField-DtXzDAXc.js";import"./useControllableState-CTVR2G-L.js";import"./Modal.context-fguPQkN6.js";import"./Checkbox-DxeO0Bad.js";import"./Fieldset-2ScBIhiP.js";import"./Pencil-CS03Rc3Q.js";import"./PersonbrukerTekst-Bp9kB5zu.js";import"./ClockDashed-D8TwyEqV.js";import"./Tasklist-DQemFwT-.js";import"./ErrorBoundary-cI4D8DJw.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
