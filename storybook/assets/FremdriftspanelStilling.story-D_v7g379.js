import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-CKFsWzOg.js";import{w as m,c as D}from"./ContextDecorators-i3bAWPVx.js";import{K as b}from"./schema.zod-eQxOsLMs.js";import{u as _}from"./useKandidatlisteForEier-DcWyPQzO.js";import{F as y,A as N}from"./FullførtStilling-D9UAjgBh.js";import{R as T}from"./GjenåpneStillingKnapp-CM1EV5Xq.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-BBgoe4b6.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-G78JjZX2.js";import"./OrganisasjonsnummerAlert-BRyBBSvV.js";import"./VStack-CKYEjYP9.js";import"./BasePrimitive-BYyecKB7.js";import"./List-BP41UQUP.js";import"./Link-CKoQmdNa.js";import"./KandidatHendelseTag-B6FXP1Dd.js";import"./Tag-DLZT034P.js";import"./FileXMark-BWULVMlW.js";import"./Trash-CusESwjy.js";import"./HandShakeHeart-DMYfZIZi.js";import"./Calendar-BI71gbdC.js";import"./ThumbUp-BaFn2Avv.js";import"./Table-C-HaVMJy.js";import"./util-BhCQq61x.js";import"./format-C7fWF7bo.js";import"./match-_P1yVbyy.js";import"./parseISO-B6fEo_Rt.js";import"./parse-BNYgtDZ7.js";import"./getDefaultOptions-CrgewLMG.js";import"./util-BKoP-Whd.js";import"./kandidat.mock-BncaIWAV.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-RlzHsrd_.js";import"./index-B2Nh_DF3.js";import"./index-CFbiSXog.js";import"./index-B_Kjqkv7.js";import"./ChevronDown-5n4edY9Q.js";import"./Box-Dmuvm9YY.js";import"./Bell-CjMN3yW3.js";import"./PersonChat-D0V_4F2X.js";import"./Eye-B19JbyPR.js";import"./ProgressBar-BaImmwHd.js";import"./oppdaterStilling-_rn--8UU.js";import"./EyeSlash-CeP3MOxv.js";import"./CircleSlash-hury9rpT.js";import"./Modal-CO9x5ynS.js";import"./floating-ui.react--LN1m7xr.js";import"./Date.Input-DOTjZeUY.js";import"./useFormField-BpikIYHf.js";import"./useControllableState-DUu4Zg_I.js";import"./Modal.context-DV2XXzj1.js";import"./Checkbox-TePdsUoC.js";import"./Fieldset-BpmtbA--.js";import"./Pencil-DWA0vGKM.js";import"./PersonbrukerTekst-B-PztRp9.js";import"./ClockDashed-B4fOPbni.js";import"./Tasklist-BvEsElIY.js";import"./ErrorBoundary-C8m9GuJO.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
