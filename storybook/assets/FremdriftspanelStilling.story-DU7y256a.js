import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-DnzzPsuE.js";import{w as d,c as D}from"./ContextDecorators-lm7k0P2K.js";import{F as N,A as v}from"./FullførtStilling-Ba1499Se.js";import{R as T}from"./GjenåpneStillingKnapp-CiUdIv0G.js";import{T as A}from"./TilgangskontrollForInnhold-D6J7mtya.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BJZyqE9E.js";import"./OrganisasjonsnummerAlert-Bn_kfH1s.js";import"./VStack-BMNk3C3G.js";import"./BasePrimitive-BepNQS7l.js";import"./List-CqR4kegF.js";import"./Link-CaTHICZj.js";import"./KandidatHendelseTag-BuC8pwi5.js";import"./Tag-B1Z2_Is7.js";import"./ChatExclamationmark-CGc0wXvz.js";import"./FileXMark-Cyoi7yos.js";import"./Trash-BjtkO_oP.js";import"./HandShakeHeart-D918vreX.js";import"./Calendar-CrEPD-vT.js";import"./ThumbUp-DHgNpTNm.js";import"./Table-BB16ahds.js";import"./util-m2rlUe0u.js";import"./format-B-zWQ5Zw.js";import"./match-BzWMqxar.js";import"./parse-BJAx9Sy_.js";import"./getDefaultOptions-aRbab0sC.js";import"./parseISO-CknJZkO_.js";import"./util-Y2w3nFye.js";import"./accordion-rUawTVNe.js";import"./index-B2kYnToh.js";import"./index-DRVDrj7b.js";import"./index-5AhUJ5E-.js";import"./ChevronDown-CtB-zssB.js";import"./Box-Y3B3v9T8.js";import"./Bell-CC1j5aKO.js";import"./PersonChat-DaPIZyMZ.js";import"./Eye-B-JvacS8.js";import"./ProgressBar-BBQudsAq.js";import"./EyeSlash-Cz80A_cw.js";import"./CircleSlash-5GjorXni.js";import"./Modal-B6IckbJN.js";import"./floating-ui.react-CKIy3Pr5.js";import"./Date.Input-xl8xuOwe.js";import"./useFormField-Bv-meZHM.js";import"./useControllableState-CICtFSXA.js";import"./Modal.context-C9jBMjOi.js";import"./Checkbox-Dmn66iNR.js";import"./Fieldset-BuB8Q4Pr.js";import"./Pencil-CwZlNubu.js";import"./PersonbrukerTekst-DojF_bDZ.js";import"./ClockDashed-D2Nsa05P.js";import"./Tasklist-Di6qPMhZ.js";import"./ErrorBoundary-XgCau_VU.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),m=I(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
