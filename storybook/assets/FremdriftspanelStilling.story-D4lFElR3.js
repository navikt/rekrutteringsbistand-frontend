import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-CVBkVRHF.js";import{w as m,c as A}from"./ContextDecorators-DG5y3y-F.js";import{F as N,A as v}from"./FullførtStilling-Da-22saF.js";import{R as T}from"./GjenåpneStillingKnapp-Bknt5WCA.js";import{T as D}from"./TilgangskontrollForInnhold-D_fVPEzX.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BpOZnLcj.js";import"./OrganisasjonsnummerAlert-Dp5HlO_N.js";import"./VStack-Cq6dbmLc.js";import"./BasePrimitive-BeBnSchP.js";import"./List-DZ2GVroy.js";import"./Link-BOVfU6gi.js";import"./KandidatHendelseTag-EjcTTuP0.js";import"./Tag-BADpau7b.js";import"./ChatExclamationmark-IenPoPHO.js";import"./FileXMark-zzWBa9Eq.js";import"./Trash-Bacxo7n-.js";import"./HandShakeHeart-BjCe4tGN.js";import"./Calendar-B6KviKfM.js";import"./ThumbUp-BZH0LyNq.js";import"./Table-BIxD-IXk.js";import"./util-BYyFu15r.js";import"./parse-B3lIiDIH.js";import"./getDefaultOptions-DGJkWuW5.js";import"./parseISO-DJBs45yK.js";import"./index-CrQSO_VJ.js";import"./index-B40KJ5b4.js";import"./isBefore-BLy3e1RW.js";import"./util-BXWN6ppT.js";import"./accordion-BM13MQ1G.js";import"./index-CFNYhMjZ.js";import"./index-BJkVUUVk.js";import"./index-BCzLpAkS.js";import"./ChevronDown-DXP1Hd-m.js";import"./Box-nDoT1RKb.js";import"./Bell-DqbjWmCx.js";import"./PersonChat-B_oC9oT9.js";import"./Eye-D6ywcsv4.js";import"./ProgressBar-BNTsQW5M.js";import"./EyeSlash-DIim-Ja_.js";import"./CircleSlash-YC6KZ_Qx.js";import"./Modal-DwOvZulO.js";import"./floating-ui.react-DeZxRt_-.js";import"./Date.Input-oFcR67dI.js";import"./useFormField-Bz__yru5.js";import"./useControllableState-mI0byIJB.js";import"./Modal.context-BtREQe4S.js";import"./Checkbox-B5rytOSV.js";import"./Fieldset-bBHk-qbG.js";import"./Pencil-Jkk0E3lX.js";import"./PersonbrukerTekst-x9o7SYt2.js";import"./ClockDashed-6mEGPWoB.js";import"./Tasklist-CLhziAiL.js";import"./ErrorBoundary-BKDAqp8f.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
