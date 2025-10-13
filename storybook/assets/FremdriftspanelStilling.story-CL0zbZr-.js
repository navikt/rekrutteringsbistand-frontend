import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Ejs43Sks.js";import{w as m,c as D}from"./ContextDecorators-BgKA_hxY.js";import{K as b}from"./schema.zod-Cig9rv21.js";import{u as _}from"./useKandidatlisteForEier-W5BTphQz.js";import{F as y,A as N}from"./FullførtStilling-CgEzvBcx.js";import{R as T}from"./GjenåpneStillingKnapp-BngjHN2v.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-4sZhvv-5.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BjpbXg5q.js";import"./OrganisasjonsnummerAlert-fjDuoqIW.js";import"./VStack-CchjVpJ5.js";import"./BasePrimitive-BxpluNwg.js";import"./List-Her9o2HL.js";import"./Link-C9NCChkG.js";import"./KandidatHendelseTag-DiwijmOF.js";import"./Tag-TP6QH-jh.js";import"./FileXMark-DChOUZ4n.js";import"./Trash-Bm0dsz2Z.js";import"./HandShakeHeart-CGufr3rg.js";import"./Calendar-CsD0Nk9_.js";import"./ThumbUp-CUoVvEhw.js";import"./Table-BqaDFad4.js";import"./util-BQ3vDkfm.js";import"./format-BimL1EHc.js";import"./match-LE9LHLKw.js";import"./parseISO-DHy74_RK.js";import"./parse-COTUoLn0.js";import"./getDefaultOptions-B-7UKY3W.js";import"./util-DHJPPEgd.js";import"./kandidat.mock-BphfR3P7.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-BXVW9bwJ.js";import"./index-ChUntDKy.js";import"./index-BoiR0ib2.js";import"./index-CW_4WMXj.js";import"./ChevronDown-no_Jq8A9.js";import"./Box-B4lI0D0x.js";import"./Bell-GaYxflfp.js";import"./PersonChat-BOh3FPeW.js";import"./Eye-CRhXOea7.js";import"./ProgressBar-DUSNOHRg.js";import"./oppdaterStilling-BQeRg9Vh.js";import"./EyeSlash-CCnkJJ_A.js";import"./CircleSlash-CiJVATaV.js";import"./Modal-BP64UtCa.js";import"./floating-ui.react-BwRoqLYP.js";import"./Date.Input-CsFsJtM3.js";import"./useFormField-BMJXgtxV.js";import"./useControllableState-CSEGMF6f.js";import"./Modal.context-DQr9EoQJ.js";import"./Checkbox-Bp_bexpX.js";import"./Fieldset-DTXF1M-f.js";import"./Pencil-BZBV7Vk7.js";import"./PersonbrukerTekst-DIJzgpHz.js";import"./ClockDashed-BRcKRJGQ.js";import"./Tasklist-DpmeNKJN.js";import"./ErrorBoundary-B-WRCN86.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
